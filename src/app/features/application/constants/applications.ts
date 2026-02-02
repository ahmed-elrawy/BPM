export enum APPLICATIONS_ROUTES {
  ASSIGNMENTS = 'assignments',
  REQUESTS = 'requests',
  APPLICATIONS = 'applications',

}


export const APPLICATIONS_NAV_ITEMS = [
            {
                label: 'Main',
                icon: 'pi pi-file',
                items: [
                    {
                        label: 'Assignments',
                        icon: 'pi pi-file',
                        routerLink: `${APPLICATIONS_ROUTES.ASSIGNMENTS}`
                    },
                    {
                        label: 'Requests',
                        icon: 'pi pi-image',
                        routerLink: `${APPLICATIONS_ROUTES.REQUESTS}`,
                      
                    }
                ]
            },
           
        ]