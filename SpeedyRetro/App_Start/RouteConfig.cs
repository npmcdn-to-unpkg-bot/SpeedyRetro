using System.Web.Mvc;
using System.Web.Routing;

namespace SpeedyRetro
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Retrospective-Route",
                url: "retrospective/{id}",
                defaults: new { controller = "Home", action = "Retrospective", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Retro-Route",
                url: "retro/{id}",
                defaults: new { controller = "Home", action = "Retrospective", id = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Login-Route",
                url: "login",
                defaults: new { controller = "Home", action = "Login" }
            );

            routes.MapRoute(
                name: "Start-Route",
                url: "start",
                defaults: new { controller = "Home", action = "Start" }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
