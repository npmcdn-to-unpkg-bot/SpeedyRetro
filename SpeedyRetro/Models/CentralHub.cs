using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Newtonsoft.Json;
using SpeedyRetro.Data.Entities;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace SpeedyRetro.Models
{
    public class CentralHub : Hub
    {
        //This should only be called when updating a comment
        public void Send(Guid retroId, string message, int laneId, Guid commentId)
        {
            var cookies = Context.RequestCookies;

            //replace spaces with + -> bug in Context
            var userCookie = cookies["sr_user"].Value.Replace(" ", "+");

            var jwtToken = new JwtToken().DecodedValue(userCookie);

            var payload = JsonConvert.DeserializeObject<Dictionary<string, object>>(jwtToken["Payload"]);

            var userGuid = Guid.Parse(payload["sr_uid"].ToString());

            using (var context = new SpeedyRetroDbContext())
            {
                var comment = context.Comments
                    .Single(c => c.Guid == commentId && c.User.Guid == userGuid);

                comment.Message = message;

                comment.LaneId = laneId;

                context.SaveChanges();
            }

            Clients.OthersInGroup(retroId.ToString()).onCommentStateChanged(message, laneId, commentId);
        }

        public Task JoinGroup(string groupName)
        {
            return Groups.Add(Context.ConnectionId, groupName);
        }

        //public async Task JoinGroup(string groupName)
        //{
        //    await Groups.Add(Context.ConnectionId, groupName);
        //    Clients.Group(groupName).addContosoChatMessageToPage(Context.ConnectionId + " added to group");
        //}

        public Task LeaveGroup(string groupName)
        {
            return Groups.Remove(Context.ConnectionId, groupName);
        }

        public override Task OnConnected()
        {
            // Add your own code here.
            // For example: in a chat application, record the association between
            // the current connection ID and user name, and mark the user as online.
            // After the code in this method completes, the client is informed that
            // the connection is established; for example, in a JavaScript client,
            // the start().done callback is executed.
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            // Add your own code here.
            // For example: in a chat application, mark the user as offline, 
            // delete the association between the current connection id and user name.
            return base.OnDisconnected(stopCalled);
        }

        public override Task OnReconnected()
        {
            // Add your own code here.
            // For example: in a chat application, you might have marked the
            // user as offline after a period of inactivity; in that case 
            // mark the user as online again.
            return base.OnReconnected();
        }
    }

    public class ErrorHandlingPipelineModule : HubPipelineModule
    {
        protected override void OnIncomingError(ExceptionContext exceptionContext, IHubIncomingInvokerContext invokerContext)
        {
            Debug.WriteLine("=> Exception " + exceptionContext.Error.Message);
            if (exceptionContext.Error.InnerException != null)
            {
                Debug.WriteLine("=> Inner Exception " + exceptionContext.Error.InnerException.Message);
            }
            base.OnIncomingError(exceptionContext, invokerContext);
        }
    }
}