/// <reference path="_references.js" />
(function (window, undefined) {
    var deliveryTracker = window["deliveryTracker"] = {}; //clear namespace

    deliveryTracker.DeliveriesViewModel = function () {
        // Private
        var self = this;
        self.position = ko.observable();

        // Initialize remote and local datasource
        self.dataSource = upshot.dataSources.DeliveriesForToday;
        self.dataSource.setFilter({ property: "IsDelivered", operator: "==", value: false } ); //,
        self.dataSource.setSort({ property: "Customer/Name", descending: false });

        self.dataSource.refresh();

        self.localDataSource = upshot.LocalDataSource({ source: self.dataSource, autoRefresh: true, allowRefreshWithEdits: true });

        self.deliveries = self.localDataSource.getEntities();
        self.deliveriesForCustomer = self.deliveries.groupBy("Customer");

        // Initialize geolocation
        if (navigator.geolocation) {
            self.deliveries.subscribe(CalculateDistanceFromMe); //recalculate distance if data is refreshed
            self.position.subscribe(CalculateDistanceFromMe);   //recalculate distance if position is refreshed

            navigator.geolocation.getCurrentPosition(function (position) {
                self.position(position);
            });
        }

        // Recalculate distance from deliverer when data or geolocation changes
        function CalculateDistanceFromMe() {

            if (self.position() && self.deliveriesForCustomer && self.deliveriesForCustomer().length > 0) {

                //calculate and update distances
                ko.utils.arrayForEach(self.deliveriesForCustomer(), function (keyValuePair) {
                    var customer = keyValuePair.key;
                    var dist = geolocationUtils.calculateDistance(self.position().coords.latitude, self.position().coords.longitude, customer.Latitude(), customer.Longitude());
                    customer.DistanceFromMe(dist.toFixed(2));
                });

                //set sorting function on local datasource: sort on ascending DistanceFromMe
                self.localDataSource.setSort(function (delivery1, delivery2) {
                    var value1 = delivery1.Customer().DistanceFromMe();
                    var value2 = delivery2.Customer().DistanceFromMe();
                    return (value1 - value2);
                });
               self.localDataSource.refresh(); //trigger refresh with sorting

                //sort data grouped by customer
                self.deliveriesForCustomer().sort(function (left, right) {
                    var value1 = left.key.DistanceFromMe();
                    var value2 = right.key.DistanceFromMe();
                    return (value1 - value2);
                });
            };
        };

        self.excludeDelivered = ko.observable(false);

        // Operations
        self.saveAll = function () { self.dataSource.commitChanges() }
        self.revertAll = function () { self.dataSource.revertChanges() }

        // Subscription: include/exclude delivered items
        self.excludeDelivered.subscribe(function (shouldExcludeDelivered) {
            var filterRule = shouldExcludeDelivered
            ? { property: "IsDelivered", operation: "==", value: false }
            : null;
            self.localDataSource.setFilter(filterRule);
            self.localDataSource.refresh();
        });
    };

    deliveryTracker.MobileDeliveriesViewModel = function () {
        //inherit from DeliveriesViewModel
        var self = this;
        deliveryTracker.DeliveriesViewModel.call(self);

        // Data
        self.currentDelivery = ko.observable();

        self.nav = new NavHistory({
            params: { view: 'deliveries', deliveryId: null },
            onNavigate: function (navEntry) {
                var requestedDeliveryId = navEntry.params.deliveryId;
                self.dataSource.findById(requestedDeliveryId, self.currentDelivery);
            }
        });

        //Operations
        self.showDeliveries = function ()
        { self.nav.navigate({ view: 'deliveries' }) };
        self.showCustomers = function ()
        { self.nav.navigate({ view: 'customers' }) };

        self.showDelivery = function (delivery) {
            self.nav.navigate({ view: 'delivery',
                deliveryId: delivery.DeliveryId()
            })
        };

        self.nav.initialize({ linkToUrl: true });
    };

    deliveryTracker.Customer = function (data) {
        var self = this;

        self.CustomerId = ko.observable(data.CustomerId);
        self.Name = ko.observable(data.Name);
        self.Address = ko.observable(data.Address);
        self.Latitude = ko.observable(data.Latitude);
        self.Longitude = ko.observable(data.Longitude);

        //only exists client-side
        self.DistanceFromMe = ko.observable('unknown');

        upshot.addEntityProperties(self, "Customer:#DeliveryTracker.Models");
    };

    deliveryTracker.Delivery = function (data) {
        var self = this;

        self.DeliveryId = ko.observable(data.DeliveryId);
        self.CustomerId = ko.observable(data.CustomerId);
        self.Customer = ko.observable(data.Customer ? new deliveryTracker.Customer(data.Customer) : null);
        self.Description = ko.observable(data.Description);
        self.IsDelivered = ko.observable(data.IsDelivered);

        upshot.addEntityProperties(self, "Delivery:#DeliveryTracker.Models");
    };

    //Expose deliveryTracker to global
    window["deliveryTracker"] = deliveryTracker;
})(window);