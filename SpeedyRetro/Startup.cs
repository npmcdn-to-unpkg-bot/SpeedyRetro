using Microsoft.AspNet.SignalR;
using Microsoft.Owin;
using Owin;
using SpeedyRetro.Models;

[assembly: OwinStartupAttribute(typeof(SpeedyRetro.Startup))]

namespace SpeedyRetro
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            GlobalHost.HubPipeline.AddModule(new ErrorHandlingPipelineModule());

            app.MapSignalR();

            ConfigureAuth(app);
        }
    }
}
