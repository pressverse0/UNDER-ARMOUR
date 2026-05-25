export interface CatalogProduct {
  id: number
  name: string
  price: number
  category: string
}

const CATALOG: CatalogProduct[] = [
  { id: 1,   name: "HeatGear Compression Shirt",  price: 35,  category: "Training"    },
  { id: 2,   name: "HOVR Phantom 3",               price: 140, category: "Footwear"    },
  { id: 3,   name: "Tech 2.0 Shorts",              price: 30,  category: "Bottoms"     },
  { id: 4,   name: "Project Rock Tank",            price: 40,  category: "Training"    },
  { id: 5,   name: "Charged Assert 10",            price: 75,  category: "Footwear"    },
  { id: 6,   name: "Sportstyle Jacket",            price: 90,  category: "Outerwear"   },
  { id: 7,   name: "ColdGear Base Layer",          price: 55,  category: "Training"    },
  { id: 8,   name: "Rival Fleece Hoodie",          price: 50,  category: "Outerwear"   },
  { id: 9,   name: "UA RUSH Training Pants",       price: 70,  category: "Bottoms"     },
  { id: 10,  name: "Curry Flow 11",                price: 160, category: "Basketball"  },
  { id: 11,  name: "HeatGear Training Shirt",      price: 35,  category: "Apparel"     },
  { id: 12,  name: "Storm Windbreaker",            price: 80,  category: "Outerwear"   },
  { id: 101, name: "UA Fly Fast 2.0 Tights",       price: 55,  category: "Running"     },
  { id: 102, name: "Meridian Leggings",            price: 65,  category: "Training"    },
  { id: 103, name: "Infinity Covered Sports Bra",  price: 45,  category: "Training"    },
  { id: 104, name: "ColdGear Mock",                price: 60,  category: "Training"    },
  { id: 105, name: "Charged Pursuit 3",            price: 70,  category: "Footwear"    },
  { id: 106, name: "Meridian Crop Tank",           price: 30,  category: "Training"    },
  { id: 107, name: "Tech Twist T-Shirt",           price: 25,  category: "Apparel"     },
  { id: 108, name: "Breathelux Midi Sports Bra",   price: 50,  category: "Training"    },
  { id: 109, name: "HOVR Sonic 5",                 price: 100, category: "Running"     },
  { id: 110, name: "Flow Velociti Wind",           price: 120, category: "Running"     },
  { id: 151, name: "Charged Bandit Trail 3",       price: 80,  category: "Kids"        },
  { id: 152, name: "Pennant 2.0 Backpack",         price: 35,  category: "Kids"        },
  { id: 153, name: "HeatGear Armour Kids Shorts",  price: 22,  category: "Kids"        },
  { id: 154, name: "Ignite Kids Training Shirt",   price: 20,  category: "Kids"        },
  { id: 201, name: "Project Rock Gym Bag",         price: 75,  category: "Accessories" },
  { id: 202, name: "UA Storm Undeniable Duffle",   price: 55,  category: "Accessories" },
  { id: 203, name: "UA Hustle 5.0 Backpack",       price: 65,  category: "Accessories" },
  { id: 204, name: "UA Training Gloves",           price: 28,  category: "Accessories" },
  { id: 205, name: "UA Performance Cap",           price: 22,  category: "Accessories" },
  { id: 206, name: "UA Sport Headbands 3-Pack",    price: 12,  category: "Accessories" },
  { id: 301, name: "HOVR Sonic 5 Shoes",           price: 100, category: "Shoes"       },
  { id: 302, name: "Charged Escape 4",             price: 65,  category: "Shoes"       },
  { id: 303, name: "Flow Velociti Wind 2",         price: 140, category: "Shoes"       },
  { id: 304, name: "Charged Commit TR 3",          price: 70,  category: "Shoes"       },
  { id: 305, name: "HOVR Apex 5",                  price: 120, category: "Shoes"       },
  { id: 306, name: "Charged Impulse 3 Knit",       price: 85,  category: "Shoes"       },
  { id: 401, name: "Unstoppable Bomber Jacket",    price: 110, category: "Outerwear"   },
  { id: 402, name: "Rival Terry Full-Zip Hoodie",  price: 65,  category: "Outerwear"   },
  { id: 403, name: "Flow Velociti Wind 2",         price: 140, category: "Running"     },
  { id: 501, name: "UA Performance Polo",          price: 75,  category: "Golf"        },
  { id: 502, name: "Storm Midlayer Hoodie",        price: 90,  category: "Golf"        },
  { id: 503, name: "Tech Golf Shorts",             price: 55,  category: "Golf"        },
]

const catalogMap = new Map<number, CatalogProduct>(CATALOG.map(p => [p.id, p]))

export function lookupProduct(id: number): CatalogProduct | undefined {
  return catalogMap.get(id)
}
