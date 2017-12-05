using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using PhoneList.Models;

namespace PhoneList.Controllers
{
    public class PhoneBooksController : ApiController
    {
        private Contact_BookEntities db = new Contact_BookEntities();

        // GET: api/PhoneBooks
        public IQueryable<PhoneBook> GetPhoneBooks()
        {
            return db.PhoneBooks;
        }

        public PhoneBook GetPhoneBooks(int Id)
        {
            var data = db.PhoneBooks.Where(g => g.Contact_Id.Equals(Id)).FirstOrDefault();
            if (data != null)
            {
                PhoneBook pb = new PhoneBook();
                pb.Contact_Id = data.Contact_Id;
                pb.FirstName = data.FirstName;
                pb.LastName = data.LastName;
                pb.Phone_No = data.Phone_No;
                pb.Email = data.Email;

                return pb;
                
            }
            else
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }
        }
        // GET: api/PhoneBooks/5
        [ResponseType(typeof(PhoneBook))]
        public IHttpActionResult GetPhoneBook(int id)
        {
            PhoneBook phoneBook = db.PhoneBooks.Find(id);
            if (phoneBook == null)
            {
                return NotFound();
            }

            return Ok(phoneBook);
        }

        // PUT: api/PhoneBooks/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPhoneBook(int id, PhoneBook phoneBook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            using (db)
            {
                var phone = db.PhoneBooks.Where(p => p.Contact_Id.Equals(id)).FirstOrDefault();
                if (phone != null)
                {
                    phone.FirstName = phoneBook.FirstName;
                    phone.LastName = phoneBook.LastName;
                    phone.Phone_No = phoneBook.Phone_No;
                    phone.Email = phoneBook.Email;

                    var results = db.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }
            return Ok();
        }

        // POST: api/PhoneBooks
        [ResponseType(typeof(PhoneBook))]
        public IHttpActionResult PostPhoneBook(PhoneBook phoneBook)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PhoneBooks.Add(phoneBook);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = phoneBook.Contact_Id }, phoneBook);
        }

        // DELETE: api/PhoneBooks/5
        [ResponseType(typeof(PhoneBook))]
        public IHttpActionResult DeletePhoneBook(int id)
        {
            PhoneBook phoneBook = db.PhoneBooks.Find(id);
            if (phoneBook == null)
            {
                return NotFound();
            }

            db.PhoneBooks.Remove(phoneBook);
            db.SaveChanges();

            return Ok(phoneBook);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PhoneBookExists(int id)
        {
            return db.PhoneBooks.Count(e => e.Contact_Id == id) > 0;
        }
    }
}