using Microsoft.AspNet.SignalR;
using System;

namespace SpeedyRetro.Models
{
    public class CentralHub : Hub
    {
        public void Send(Guid appId, Guid userId, string userComment, string commentState)
        {
            // Call the addNewMessageToPage method to update clients.
            //Clients.All.addNewMessageToPage(name, message);

            Clients.All.onCommentStateChanged(appId, userId, userComment, commentState);
        }
    }

    public enum CommentState
    {
        Good = 0,
        Bad = 1,
        Action = 2
    }
}