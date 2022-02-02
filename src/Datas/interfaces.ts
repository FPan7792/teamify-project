export interface LeaguesSchemas {
   datas: {
      leagues: {
         id: number;
         name: string;
         types: string;
         logo: string;
      };
      country: {
         name: string;
         code: string;
         flag: string;
      };
      seasons: Object[];
   };
}
