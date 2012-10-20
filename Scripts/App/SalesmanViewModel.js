function SalesmanViewModel() {
    // Private
    var self = this;
    var dataSourceOptions = {
        providerParameters: { url: "/api/SalesmanService", operationName: "GetSalesman" },
        entityType: "SalesmanModel:#AddCon_TravellingSalesman.Models",
        bufferChanges: false,
        mapping: Salesman
    };

    // Public Properties
    self.dataSource = new upshot.RemoteDataSource(dataSourceOptions).refresh();
    self.deliveries = self.dataSource.getEntities();
}

function Salesman(data) {
    var self = this;
    self.FirstName = ko.observable(data.FirstName);
    self.LastName = ko.observable(data.LastName);
    self.Email = ko.observable(data.Email);
    self.Tel = ko.observable(data.Tel);
    self.Mob = ko.observable(data.Mob);
    self.Fax = ko.observable(data.Fax);
    self.Latitude = ko.observable(data.Latitude);
    self.Longitude = ko.observable(data.Longitude);
    upshot.addEntityProperties(self, "SalesmanModel:#AddCon_TravellingSalesman.Models");
}