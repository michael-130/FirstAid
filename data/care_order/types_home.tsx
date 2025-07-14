export type SicknessInfo = {
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

export type UserAppointments = {
  [categoryKey: string]: {
    [illnessName: string]: {
      appointment: boolean;
    };
  };
};

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
