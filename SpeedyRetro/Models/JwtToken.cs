using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace SpeedyRetro.Models
{
    public class JwtToken
    {
        private byte[] _header = new byte[] { };

        private byte[] _payload = new byte[] { };

        public JwtToken(Dictionary<string, object> header, Dictionary<string, object> payload, string secret)
        {
            Header = Convert.ToBase64String(UTF8Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(header)));

            Payload = Convert.ToBase64String(UTF8Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(payload)));

            var data = UTF8Encoding.UTF8.GetBytes(Header + "." + Payload);

            var hashAlgorithm = new HMACSHA256(UTF8Encoding.UTF8.GetBytes(secret));

            Signature = Convert.ToBase64String(hashAlgorithm.ComputeHash(data));
        }

        public JwtToken()
        {
        }

        public Dictionary<string, string> DecodedValue(string value)
        {
            if (string.IsNullOrEmpty(value)) return null;

            var jwtToken = new Dictionary<string, string>();

            var claims = value.Split('.');

            jwtToken.Add("Header", UTF8Encoding.UTF8.GetString(Convert.FromBase64String(claims[0])));

            jwtToken.Add("Payload", UTF8Encoding.UTF8.GetString(Convert.FromBase64String(claims[1])));

            jwtToken.Add("Signature", UTF8Encoding.UTF8.GetString(Convert.FromBase64String(claims[2])));

            return jwtToken;
        }

        public string ComputedValue()
        {
            return Header + "." + Payload + "." + Signature;
        }

        public string Header { get; private set; }

        public string Payload { get; private set; }

        public string Signature { get; private set; }
    }
}