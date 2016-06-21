using Newtonsoft.Json;
using SpeedyRetro.Models;
using System;
using System.Collections.Generic;
using System.Linq;
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
            var retroId = Guid.Parse(id);

            using (var context = new SpeedyRetroDbContext())
            {
                var retrospective = context.Retrospectives
                    .Where(retro => retro.Id == retroId)
                    .FirstOrDefault();
            }

            var cookies = this.HttpContext.Request.Cookies;

            var userCookie = cookies["sr_user"];

            if (userCookie == null)
            {
                return RedirectToRoute("Add-User-Route");
            }
            //else
            //{
            var jwtToken = new JwtToken().DecodedValue(userCookie.Value);

            var payload = JsonConvert.DeserializeObject<Dictionary<string, object>>(jwtToken["Payload"]);

            //}


            return View("~/Views/Home/Retrospective.cshtml");
        }

        public JsonResult AddRetro(string name)
        {
            var retroId = Guid.NewGuid();

            var userId = Guid.NewGuid();

            using (var context = new SpeedyRetroDbContext())
            {
                context.Retrospectives.Add(new RetrospectiveViewModel
                {
                    Id = retroId,
                    Name = name
                });

                context.SaveChanges();
            }

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
            };

            return Json(new { id = retroId }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddUser(string username)
        {
            var cookies = this.HttpContext.Request.Cookies;

            var retroCookie = cookies["sr-temp-retroId"];

            var retroId = Guid.Parse(retroCookie.Value);

            var userId = Guid.NewGuid();

            using (var context = new SpeedyRetroDbContext())
            {
                var retrospective = context.Retrospectives.Where(retro => retro.Id == retroId).Single();

                context.Users.Add(new UserModel
                {
                    Id = userId,
                    Name = username,
                    Retrospective = retrospective
                });

                context.SaveChanges();
            }

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

            retroCookie.Expires = DateTime.UtcNow.AddYears(-1);

            this.HttpContext.Response.AppendCookie(retroCookie);

            return Json(new { }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Start()
        {
            ViewBag.Message = "Your contact page.";

            return View("~/Views/Home/Retrospective.cshtml");
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}