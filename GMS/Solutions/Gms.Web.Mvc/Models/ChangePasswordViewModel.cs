using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace SecurityGuard.ViewModels
{
    public class ChangePasswordViewModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "��ǰ����")]
        public string OldPassword { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "{0} Ӧ���ٰ��� {2} ���ַ���", MinimumLength = 3)]
        [DataType(DataType.Password)]
        [Display(Name = "������")]
        public string NewPassword { get; set; }

        [DataType(DataType.Password)]
        [Display(Name = "ȷ��������")]
        [System.Web.Mvc.Compare("NewPassword", ErrorMessage = "�����������벻һ�£�")]
        public string ConfirmPassword { get; set; }
    }
}
