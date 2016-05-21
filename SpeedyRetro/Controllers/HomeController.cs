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

        public ActionResult Retrospective(string id)
        {
            Guid retroId;

            if (string.IsNullOrWhiteSpace(id) || !Guid.TryParse(id, out retroId))
            {
                retroId = Guid.NewGuid();
            }

            var userId = Guid.NewGuid();

            //TODO will need to check if cookie exists first before setting it!

            //var header = new Dictionary<string, object>();
            //header.Add("alg", "HS256");
            //header.Add("typ", "JWT");

            //var payload = new Dictionary<string, object>();
            //payload.Add("iss", "SpeedyRetro");
            //payload.Add("exp", DateTime.UtcNow.AddYears(1).Second.ToString());
            //payload.Add("sub", "UserManagement");
            //payload.Add("sr_uid", userId);

            var header = new Dictionary<string, object>
            {
                ["alg"] = "HS256",
                ["typ"] = "JWT"
            };

            var payload = new Dictionary<string, object>
            {
                ["iss"] = "SpeedyRetro",
                ["exp"] = DateTime.UtcNow.AddYears(1).Second.ToString(),
                ["sub"] = "UserManagement",
                ["sr_uid"] = userId
            };

            var secret = "SpeedyRetro is great";

            var jwtToken = new JwtToken(header, payload, secret);

            var httpCookie = new HttpCookie("sr_user", jwtToken.ComputedValue());

            httpCookie.Expires = DateTime.UtcNow.AddYears(1);

            this.HttpContext.Response.AppendCookie(httpCookie);

            var view = new RetrospectiveViewModel
            {
                Id = retroId,
                UserId = userId
            };

            return View("~/Views/Home/Retrospective.cshtml", view);
        }

        public JsonResult AddRetro()
        {
            return Json(new { id = Guid.NewGuid() }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Login()
        {
            ViewBag.Message = "Your application description page.";

            return View("~/Views/Home/Retrospective.cshtml");
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}