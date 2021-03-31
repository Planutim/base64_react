using base64_react.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Buffers.Text;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace base64_react.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Base64Controller : ControllerBase
    {        
        // POST api/base64/encode
        [HttpPost]
        [Route("encode")]
        public ActionResult<Response> ToB64([FromBody] StringObject stringObject)
        {
            try
            {
                var bytes = Encoding.UTF8.GetBytes(stringObject.Text);
                var result = Convert.ToBase64String(bytes);
                return new Response
                {
                    Ok = true,
                    Text = result
                };
            }
            catch
            {
                return new Response
                {
                    Ok = false,
                    Text = "Error encoding to base64"
                };
            }
        }

        // POST api/base64/decode
        [HttpPost]
        [Route("decode")]
        public ActionResult<Response> FromB64([FromBody] StringObject stringObject)
        {
            try
            {
                var bytes = Convert.FromBase64String(stringObject.Text);
                var result = Encoding.UTF8.GetString(bytes);
                return new Response
                {
                    Ok = true,
                    Text = result
                };
            }
            catch
            {
                return new Response
                {
                    Ok = false,
                    Text = "Error decoding from base64"
                };
            }
        }
    }
}
