using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AddCon_TravellingSalesman.Models
{
    public class EventModel
    {
        [Key]
        public int ID { get; set; }

        [Required]
        [Display(Name = "Name")]
        [DataType(DataType.Text)]
        public string Name { get; set; }

        [Required]
        [Display(Name = "Description")]
        [DataType(DataType.MultilineText)]
        public string What { get; set; }

        [Required]        
        [Display(Name = "Location")]
        [DataType(DataType.Text)]
        public string Where { get; set; }

        [Required]
        [DataType(DataType.DateTime)]
        [Display(Name = "Timing")]
        public DateTime When { get; set; }

        [Required]
        [DataType(DataType.Text)]
        [Display(Name = "Facilitator")]
        public string Who { get; set; }
    }
}