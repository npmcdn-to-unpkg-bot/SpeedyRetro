using SpeedyRetro.Models;
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;

namespace SpeedyRetro.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Retrospective(Guid id)
        {
            if (id == Guid.Empty)
            {
                return HttpNotFound();
            }

            var header = new Dictionary<string, object>();
            header.Add("alg", "HS256");
            header.Add("typ", "JWT");

            var payload = new Dictionary<string, object>();
            payload.Add("iss", "SpeedyRetro");
            payload.Add("exp", DateTime.UtcNow.AddYears(1).Second.ToString());
            payload.Add("sub", "UserManagement");
            payload.Add("sr_id", Guid.NewGuid().ToString());

            var secret = "SpeedyRetro is great";

            var jwtToken = new JwtToken(header, payload, secret);

            var httpCookie = new HttpCookie("sr_user", jwtToken.ComputedValue());

            httpCookie.Expires = DateTime.UtcNow.AddYears(1);

            this.HttpContext.Response.AppendCookie(httpCookie);

            return View("~/Views/Home/Retrospective.cshtml", id);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}