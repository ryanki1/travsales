using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddCon_TravellingSalesman.Models
{
    public class SalesmanModel
    {

        //DataType.EmailAddress;
        //DataType.PhoneNumber;            

        [Key]
        //[DatabaseGenerated(DatabaseGenerationOption.Computed)]
        public int ID { get; set; }

        [Required]
        [Display(Name = "First Name")]        
        public string FirstName { get; set; }

        [Required]
        [Display(Name = "Last Name")]
        public string LastName { get; set; }

        [Required]
        [DataType(DataType.EmailAddress)]
        [Display(Name = "E-Mail")]
        public string EMail { get; set; }

        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Tel")]
        public string Tel { get; set; }

        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Mob")]
        public string Mob { get; set; }

        [DataType(DataType.PhoneNumber)]
        [Display(Name = "Fax")]
        public string Fax { get; set; }

        [Display(Name = "Latitude")]
        public decimal Latitude { get; set; }

        [Display(Name = "Longitude")]
        public decimal Longitude { get; set; }

    }
}