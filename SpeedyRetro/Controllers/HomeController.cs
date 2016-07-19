﻿using Newtonsoft.Json;
using SpeedyRetro.Data.Entities;
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
            return RedirectToRoute("Start-Route");
        }

        public ActionResult Retrospective(string id)
        {
            var retroId = Guid.Parse(id);

            using (var context = new SpeedyRetroDbContext())
            {
                var retrospective = context.Retrospectives
                    .Where(retro => retro.Guid == retroId)
                    .FirstOrDefault();
            }

            var cookies = this.HttpContext.Request.Cookies;

            var userCookie = cookies["sr_user"];

            if (userCookie == null)
            {
                return RedirectToRoute("Login-Route");
            }
            else
            {
                var jwtToken = new JwtToken().DecodedValue(userCookie.Value);

                var payload = JsonConvert.DeserializeObject<Dictionary<string, object>>(jwtToken["Payload"]);

                var userId = Guid.Parse(payload["sr_uid"].ToString());

                using (var context = new SpeedyRetroDbContext())
                {
                    var retrospective = context.Retrospectives.Where(retro => retro.Guid == retroId).Single();

                    var userModel = context.Users
                            .Where(user => user.Guid == userId)
                            .SingleOrDefault();

                    if (userModel == null)
                    {
                        return RedirectToRoute("Login-Route");
                    }
                    else
                    {
                        //check if user is associated with retro
                        //add user to retro
                    }

                }

            }

            return View("~/Views/Home/Retrospective.cshtml");
        }

        public JsonResult AddRetro(string name)
        {
            var retroId = Guid.NewGuid();

            using (var context = new SpeedyRetroDbContext())
            {
                var defaultPool = context.Pools.Where(pool => pool.Id == 1).Single();

                var board = new Board
                {
                    Pool = defaultPool
                };

                context.Retrospectives.Add(new Retrospective
                {
                    Board = board,
                    Guid = retroId,
                    Name = name
                });

                context.SaveChanges();
            }

            var view = new Retrospective
            {
                Guid = retroId,
            };

            return Json(new { id = retroId }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult Pool(int id)
        {
            using (var context = new SpeedyRetroDbContext())
            {
                var pool = context.Pools
                    .Include("Lanes")
                    .Where(p => p.Id == id)
                    .SingleOrDefault();

                return Json(pool, JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult AddUser(UserViewModel userViewModel)
        {
            var cookies = this.HttpContext.Request.Cookies;

            //var retroCookie = cookies["sr-temp-retroId"];

            var retroId = Guid.Parse(userViewModel.RetroId);

            var userId = Guid.NewGuid();

            using (var context = new SpeedyRetroDbContext())
            {
                var retrospective = context.Retrospectives.Where(retro => retro.Guid == retroId).SingleOrDefault();

                if (retrospective == null)
                {
                    return RedirectToRoute("Add-Retro-Route");
                }

                var userModel = new User
                {
                    Guid = userId,
                    Name = userViewModel.Name,
                    Retrospectives = new List<Retrospective>()
                };

                userModel.Retrospectives.Add(retrospective);

                context.Users.Add(userModel);

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

            //retroCookie.Expires = DateTime.UtcNow.AddYears(-1);

            //this.HttpContext.Response.AppendCookie(retroCookie);

            return Json(new { }, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public ActionResult CommentId(string retroId)
        {

            //add logic to ADD the comment so that their is an association
            //with the current user

            var retroGuid = Guid.Parse(retroId);

            var cookies = this.HttpContext.Request.Cookies;

            var userCookie = cookies["sr_user"];

            var commentGuid = Guid.NewGuid();

            if (userCookie == null)
            {
                return RedirectToRoute("Login-Route");
            }
            else
            {
                var jwtToken = new JwtToken().DecodedValue(userCookie.Value);

                var payload = JsonConvert.DeserializeObject<Dictionary<string, object>>(jwtToken["Payload"]);

                var userGuid = Guid.Parse(payload["sr_uid"].ToString());

                using (var context = new SpeedyRetroDbContext())
                {
                    var user = context.Users
                        .Where(u => u.Guid == userGuid)
                        .Single();

                    var startLane = context.Lanes
                        .Where(l => l.Id == 1)
                        .Single();

                    var board = context.Boards
                        .Where(b => b.Retrospective.Guid == retroGuid)
                        .Single();

                    var comment = new Comment
                    {
                        Board = board,
                        Guid = commentGuid,
                        Lane = startLane,
                        User = user
                    };

                    context.Comments.Add(comment);

                    context.SaveChanges();
                }

            }

            return Json(new { id = commentGuid }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult Start()
        {
            ViewBag.Message = "Your contact page.";

            return View("~/Views/Home/Retrospective.cshtml");
        }

        public ActionResult Login()
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