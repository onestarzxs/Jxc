﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.Script.Serialization;
using System.Xml.Serialization;
using Gms.Common;
using SharpArch.Domain.DomainModel;

namespace Gms.Domain
{
    /// <summary>
    /// 商品类型
    /// 每个商品可以属于多个类型
    /// </summary>
    public class GoodsType : Entity
    {

        /// <summary>
        /// 商品
        /// </summary>
        public virtual Goods Goods { get; set; }

        /// <summary>
        /// 类型
        /// </summary>
        public virtual CommonCode Type { get; set; }
   
    }
  
}
