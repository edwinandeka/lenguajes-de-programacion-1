import {
    IonList,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonListHeader,
    IonButtons,
    IonButton,
    IonIcon,
    withIonLifeCycle,

} from '@ionic/react';
import React from 'react';

import {
    trash,
    create,
    add
} from 'ionicons/icons';


interface Person {
    id: number,
        nombre: string,
        telefono: string,
        direccion: string,
}

class HomePage extends React.Component < {}, {
    people: []
} > {

    constructor(props: any) {
        super(props);

        this.state = {
            people: []
        }
    }


    /**
     * @name getPeople
     * @description se encarga de consultar en el servidor la 
     *              informacion de las personas almacenadas en la base de datos
     * @return {void} 
     */
    getPeople() {

        const data = new FormData();
        data.append('route', 'persona/index');

        fetch('https://dowesoft.com/lenguajes-prog-avan/index.php', {
                method: 'POST',
                body: data
            })
            .then(response => response.json())
            .then(json => {

                this.setState({
                    people: json.personas
                })

            })

    }

    /**
     * @name printPerson
     * @description description
     * @return {void} 
     */
    printPerson(key: string, index: number) {


        var person: Person = this.state.people[index];


         return(
        <IonItem key={key}>
        <IonLabel>

            <h2>{person.nombre}</h2>
            <h3>{person.telefono}</h3>
            <p>{person.direccion}</p>
        </IonLabel>
         <IonButtons slot="end">

          <IonButton fill="outline" routerLink={"/edit/" + person.id}>
            <IonIcon  icon={create}   />
          </IonButton>

          <IonButton fill="outline"  routerLink={"/delete/" + person.id}>
            <IonIcon  icon={trash}  />
          </IonButton>
        </IonButtons>

      </IonItem>
    )
    }

    ionViewWillEnter() {
        this.getPeople()
    }

    render() {

        return (

       <IonPage>

          <IonHeader>

             <IonToolbar color="primary">
              <IonButtons slot="secondary">
                <IonButton fill="solid" routerLink="/add">
                  <IonIcon  icon={add} />
                  Agregar
                </IonButton>
              </IonButtons>
              <IonTitle>Lista telefónica</IonTitle>
            
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <IonList>
              <IonListHeader>
                <IonLabel>Personas</IonLabel>
              </IonListHeader>
              
              { Object.keys(this.state.people).map( this.printPerson.bind(this) ) }

            </IonList>
          </IonContent>

        </IonPage>

   )};
};


export default withIonLifeCycle(HomePage);

