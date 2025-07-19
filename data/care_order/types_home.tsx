export type SicknessInfo = { // have the 信息 from the category map
  description: string;
  address: string;
  time: string;
  appointment: boolean;
};

export type CategoryMap = {                // fixed typo from CatergoryMap → CategoryMap
  [categoryKey: string]: {
    [illnessName: string]: SicknessInfo;
  };
};

/*const CategoryMap = {
  "A": {
    "Cold" :Sicness Info(object type) a box that holds related data together using key value pairs
  },
  "B": {
    "Fever": {
      appointment: true
    }
  }
};
 */

/*| Name       | Looks Like                 | Use Case                      |
| ---------- | -------------------------- | ----------------------------- |
| **Array**  | `[1, 2, 3]`                | List of things (no key names) |
| **Object** | `{ name: "Tom", age: 30 }` | Detailed data (with keys)     |
*/

export type UserAppointments = {
  [categoryKey: string]: {
    [illnessName: string]: {
      appointment: boolean;
    };
  };
};
/*const userAppointments: UserAppointments = {
  "A": {
    "Cold": {
      appointment: true
    },
    "Flu": {
      appointment: false
    }
  },
  "B": {
    "Fever": {
      appointment: true
    }
  }
};
*/

export type User = {
  appointment: UserAppointments;
  recommended: {
    [categoryKey: string]: string[];      // recommended should map categories to arrays of illness names
  };
  authentication: {
    number?: string;
  };
};



export type UserMap = {
  [username: string]: User;
};

/* user map = {
   name : 
       User object(appointment: UserAppointments;
         recommended: {
            [categoryKey: string]:
                       string[];
                          string[] have  SicknessInfo     // recommended should map categories to arrays of illness names
  };
  authentication: {
    number?: string;
  };)
} 
  john{
    appointment =  {
      "CategoryA": {
        "Flu": {
          appointment: true
        }
      },
      "CategoryB": {
        "Headache": {
          appointment: false
        }
      }
    }
    recommended: {
      "CategoryA": ["Flu", "Covid"],
      "CategoryB": ["Headache"]
    },
    authentication: {
      number: "1234567890"
    }
}
*/


/*from home parse the value to the apply dingdan.tsx*/ 
export type RootStackParamList = {
  Home: undefined;
  'applyhome/Detail': {
    catKey: string;
    illnessName: string;
    data: SicknessInfo;
  };
};

export default SicknessInfo;

/**
 *  categoryMap[catKey]
 * categoryMap["CategoryA"] === {
  Cold: { description: "...", address: "...", time: "...", appointment: false },
  Flu: { description: "...", address: "...", time: "...", appointment: true }
}

userAppointments[catKey][illnessName] === {
categoryMap["CategoryA"]["Cold"] === { description: "...", address: "...", time: "...", appointment: false }

}
 */