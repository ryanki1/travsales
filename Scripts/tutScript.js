window.log = function (a) {
    console.log ? console.log(a) : alert(a)
};
window.tut = {
    hq: [50.731797,7.102078],
    maps: {
        _isReady: false,
        _wasInvoked: false,
        _canvasElement: undefined,
        initialize: function () {
            a= function(d, f) {
                var i = document.createElement(d),
                    c;
                for (c in f) i[c] = f[c];
                return i
            }
            var b = document.getElementsByTagName("head")[0];
            $(b).append(a("script", {
                type: "text/javascript",
                src: "http://maps.google.com/maps/api/js?sensor=true&callback=tut.maps.ready",
                async: "true"
            }));
            $(b).append(a("link", {
                type: "text/css",
                href: "/Content/tut-style.css",
                rel: "stylesheet"
            }));
        },
        map_canvas: function (a) {
            //debugger;
            if (a) {
                this.canvasElement = a;
                window.addEventListener("offline", function () {
                    a.innerHTML = "<div class='note'>connection went down</div>"
                }, false);
                //if (this.isReady && !this.wasInvoked) return this.drawMap();
                //else if (this.isReady && this.wasInvoked) return this.drawRoute()
            } else return this.canvasElement
        },
        _origin: undefined,
        _dirDisplay: undefined,
        _dirService: undefined,
        _map: 0,
        originalStation: this.hq,
        ready: function () {
            this.isReady = true;
            var a = this.originalStation || tut.hq;
            this.origin = new google.maps.LatLng(a[0], a[1]);            
            if (!this.wasInvoked && this.map_canvas()) return this.drawMap();
            else if (this.wasInvoked && this.map_canvas()) return this.drawRoute()
        },
        route: function () {
            var a = localStorage;
            if (!a.lat || !a.lng) return "Missing position data";
            else if (!this.map_canvas()) return "Missing map canvas object";
            this.wasInvoked = true;
            if (!this.isReady && this.map_canvas()) return this.map_canvas().innerHTML = "<div class='note'>The Map is still loading or a problem occured.</div>";
            else if (this.isReady && this.map_canvas()) return this.drawRoute()
        },
        drawMap: function (marker) {
            this.map = new google.maps.Map(this.map_canvas(), {
                zoom: 12,
                center: this.origin,
                mapTypeId: google.maps.MapTypeId.HYBRID,
                navigationControl: false,
                mapTypeControl: false,
                scaleControl: false
            });
            // Add a marker to the map based on office coordinates
            var marker = new google.maps.Marker({
                position: this.origin,
                map: this.map,
                zIndex:0
            });
            marker.setMap(this.map);
            return "Map drawn"
        },
        drawRoute: function () {
            //this.getClosestStation(localStorage.lat, localStorage.lng);
            this.drawMap();
            var a = new google.maps.DirectionsRenderer,
                b = new google.maps.DirectionsService,
                d = new google.maps.LatLng(localStorage.lat, localStorage.lng);
            a.setMap(this.map);
            b.route({
                origin: d,
                destination: this.origin,
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function (f, i) {
                switch (i) {
                case google.maps.DirectionsStatus.OK:
                    a.setDirections(f);
                    break;
                case google.maps.DirectionsStatus.NOT_FOUND:
                    log("Your place was not found");
                    break;
                case google.maps.DirectionsStatus.ZERO_RESULTS:
                    log("Zero results");
                    break;
                default:
                    log("An unknown error occurred.")
                }
            });
            return "Route drawn"
        }
    },
    canvas: {
        fillColor: undefined,
        strokeColor: undefined,
        gradient: undefined,
        ctx: undefined,
        canvasElement: undefined,
        getContext: function (a) {
            if (!a || !a.getContext) log("canvas.getContext: No element given or no canvas-support");
            else {
                this.canvasElement = a;
                return this.ctx = a.getContext("2d")
            }
        },
        createGradient: function (a, b, d) {
            if (a.length < 2 || b.length < 2 || d.length < 2 || !this.ctx) {
                log("canvas.createGradient: No context available or wrong parameters");
                return this
            }
            a = this.ctx.createLinearGradient(a[0], a[1], b[0], b[1]);
            for (b = 0; b < d.length; b++) a.addColorStop(b / (d.length - 1), d[b]);
            this.gradient = a;
            return this
        },
        triangle: function (a) {
            if (a.nodeType != 1 || !a.getContext) {
                log("canvas.triangle: Wrong node Type or no canvas-support");
                return this
            }
            var b = a.width,
                d = a.height;
            a = this.getContext(a).lineWidth;
            this.polygon([b * 0.5, a, b, d - a, 0, d]);
            this.fillStroke(true);
            return this
        },
        clearRect: function (a, b, d, f) {
            if (!this.ctx || this.clearRect.arguments.length < 4) {
                log("canvas.clearRect: No context available or not enough parameters");
                return this
            }
            /MSIE/.test(navigator.userAgent) && !window.opera || this.ctx.clearRext(a, b, d, f);
            return this
        },
        rect: function (a, b) {
            if (a.length < 2 || b.length < 2) {
                log("canvas.rect: Not enough parameters");
                return this
            }
            return this.polygon([a[0], a[1], b[0], a[1], b[0], b[1], a[0], b[1]])
        },
        fillStroke: function (a) {
            if (!this.ctx) {
                log("canvas.fillStroke: No context available");
                return this
            }
            var b = this.ctx;
            if (this.gradient) {
                b.fillStyle = this.gradient;
                b.fill()
            } else if (this.fillColor) {
                b.fillStyle = this.fillColor;
                b.fill()
            }
            if (this.strokeColor && a) {
                b.strokeStyle = this.strokeColor;
                b.stroke()
            }
            return this
        },
        house: function (a, b) {
            b /= 2;
            var d = document.createElement("div"),
                f = a / 2,
                i = Math.asin(f / b) * 180 / Math.PI,
                c;
            d.style.width = a + "px";
            for (var g = 0; g < 4; g++) {
                var e = document.createElement("canvas");
                e.className = "tut-house-roof";
                e.width = a;
                e.height = b;
                this.strokeColor = "hsl(199, 80%, 55%)";
                this.getContext(e);
                this.createGradient([0, 0], [a, b / 2], ["hsl(193, 90%, 60%)", "hsl(205, 70%, 53%)"]).triangle(e);
                c = g % 2 == 0 ? "translateZ(" : "translateX(";
                if (g > 1) c += "-";
                e.style.webkitTransform = c + f + "px) rotateY(" + g * 90 + "deg) rotateX(" + i + "deg)";
                d.appendChild(e);
                c = document.createElement("div");
                c.className = "tut-house-front";
                c.style.width = a * 0.8 + "px";
                c.style.height = b + "px";
                e = "translate3d";
                switch (g) {
                case 0:
                    e += "(" + a * 0.1 + "px," + b * 0.9 + "px, " + f * 0.8 + "px) ";
                    break;
                case 1:
                    e += "(" + f + "px," + b * 0.9 + "px, 0px) ";
                    break;
                case 2:
                    e += "(" + a * 0.1 + "px," + b * 0.9 + "px, -" + f * 0.8 + "px) ";
                    break;
                case 3:
                    e += "(-" + f * 0.6 + "px," + b * 0.9 + "px, 0px) "
                }
                c.style.webkitTransform = e + "rotateY(" + g * 90 + "deg)";
                d.appendChild(c)
            }
            return d
        },
        polygon: function (a) {
            if (!this.ctx || a.length < 3) {
                log("canvas.polygon: No context available or not enough parameters");
                return false
            }
            var b = this.ctx;
            b.beginPath();
            b.moveTo(a[0],
            a[1]);
            for (var d = 2; d < a.length; d++) b.lineTo(a[d], a[++d]);
            b.closePath();
            return this
        },
        ParticleAnimation: function (a, b) {
            function d() {
                c = [];
                g = 8E3;
                e = 2;
                k = 0.1;
                l = -0.01;
                m = 0.0030;
                n = Math.random() * 0.01 - 0.0050;
                r = s = 25;
                t = j = false;
                for (h = 0; h < g; h++) c[h] = new f
            }
            function f() {
                this.x = Math.random() * (o - 2 * e);
                this.y = Math.random() * (p - 2 * e);
                this.xDir = Math.random() * 2 - 1;
                this.yDir = Math.random() * 2 - 1;
                this.update = function () {
                    this.x += this.xDir;
                    this.y += this.yDir;
                    this.yDir += k;
                    if (this.x > o - e || this.x < 0) this.xDir = -this.xDir;
                    if (this.y > p - e || this.y < 0) this.yDir = -this.yDir
                }
            }
            function i() {
                q.fillStyle = b;
                q.fillRect(0, 0, o, p);
                if (g == 0) if (s > 0) {
                    s--;
                    setTimeout(i, r)
                } else {
                    j = false;
                    t = true
                } else {
                    q.fillStyle = "#fff";
                    for (h = 0; h < g; h++) {
                        c[h].update();
                        if (c[h].y + e < 0 || c[h].y > p || c[h].x + e < 0 || c[h].x > o) {
                            c.splice(h, 1);
                            g--
                        } else q.fillRect(c[h].x, c[h].y, e, e)
                    }
                    k += m;
                    l += n;
                    if (k > 0.3 || k < -0.4) m = -m;
                    if (l > 0.08 || l < -0.1) n = -n;
                    j && setTimeout(i, r)
                }
            }
            if (a) {
                b = b || this.gradient || "#000";
                var c, g, e, h, k, l, m, n, s, r, j, t, q = a.getContext("2d"),
                    o = a.width,
                    p = a.height;
                d();
                this.togglePlay = function () {
                    if (j) j = false;
                    else {
                        t && d();
                        j = true;
                        i()
                    }
                }
            }
        }
    }
};