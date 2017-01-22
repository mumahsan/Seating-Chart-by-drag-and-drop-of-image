using SeatingChart.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.IO;
using System.Web;

namespace SeatingChart.Controllers
{
    public class StudentsController : ApiController
    {
        Student[] students = new Student[]
        {
            //new Student{Id = 1, FirstName = "Billy", LastName="Abbot", ImagePath= (HttpContext.Current.Server.MapPath("/Image/1.jpg"))},
            new Student{Id = 1, FirstName = "Billy", LastName="Abbot", ImagePath= "/Image/1.jpg"},
            new Student{Id = 2, FirstName = "Paul", LastName="Addington", ImagePath="/Image/2.jpg"},
            new Student{Id = 3, FirstName = "Jose", LastName="Coleman", ImagePath=("/Image/3.jpg")},
            new Student{Id = 4, FirstName = "Carolyn", LastName="Cooley", ImagePath=("/Image/4.jpg")},
            new Student{Id = 5, FirstName = "Crum", LastName="Richard", ImagePath=("/Image/5.jpg")},
            new Student{Id = 6, FirstName = "Willam", LastName="Crum", ImagePath=("/Image/6.jpg")},
            new Student{Id = 7, FirstName = "Decker", LastName="Betty", ImagePath=("/Image/7.jpg")},
            new Student{Id = 8, FirstName = "Gilbert", LastName="James", ImagePath=("/Image/8.jpg")},
            new Student{Id = 9, FirstName = "Kanaga", LastName="Tina", ImagePath=("/Image/9.jpg")},
            new Student{Id = 10, FirstName = "Lemrie", LastName="Abbot", ImagePath=("/Image/10.jpg")},
            new Student{Id = 11, FirstName = "Kokaliares", LastName="Timothy", ImagePath=("/Image/11.jpg")},
            new Student{Id = 12, FirstName = "Moilan", LastName="Micheal", ImagePath=("/Image/12.jpg")},
            new Student{Id = 13, FirstName = "Peachy", LastName="Janet", ImagePath=("/Image/13.jpg")}
        };

        public static string imgConvert(string imgPath)
        {
            Uri uri = new Uri(imgPath);
            return uri.LocalPath;

        }

        public IEnumerable<Student> GetAllStudents()
        {
            return students.OrderBy(s => s.LastName).ToList();
        }

        public IHttpActionResult GetStudent(int id)
        {
            var student = students.FirstOrDefault(s => s.Id == id);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }
    }
}
