﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Gms.Domain;

namespace Gms.Infrastructure
{
    public interface IEquiOutRepository : IRepositoryBase<EquiOut>
    {
        IList<EquiOut> GetBy(int equiStoreOutId);
    }
}