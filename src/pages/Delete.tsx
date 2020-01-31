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
    IonCard,
    IonCardContent,
    IonToast,

} from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import {
    arrowBack,
} from 'ionicons/icons';

interface DeleteFormProps extends RouteComponentProps<{
  id: string;
}> {}

interface MyStates {
    nombre: string,
    direccion: string,
    telefono: string,
    id: string,
    showToast: boolean,
}


class DeleteForm extends React.Component <DeleteFormProps, MyStates> {


    constructor(props: any) {
        super(props);


        this.state = {
            nombre: "" ,
            direccion: "",
            telefono: "", 
            id: "", 
            showToast: false,
        }
    }

    /**
     * @name getPerson
     * @description se encarga de consultar en el servidor la 
     *              informacion de las personas almacenadas en la base de datos
     * @return {void} 
     */
    getPerson() {

        const data = new FormData();
        data.append('route', 'persona/find');
        data.append('id', ""+ this.props.match.params.id);

        fetch('https://dowesoft.com/lenguajes-prog-avan/index.php', {
            method: 'POST',
            body: data
        })
        .then(response => response.json())
        .then(json => {

            this.setState({
                id: json.persona.id,
                direccion: json.persona.direccion,
                nombre: json.persona.nombre,
                telefono: json.persona.telefono
            })

        })
    }

     /**
     * @name deletePerson
     * @description se encarga de consultar en el servidor la 
     *              informacion de las personas almacenadas en la base de datos
     * @return {void} 
     */
    deletePerson() {


      const data = new FormData();
      data.append('route', 'persona/erase');

      data.append('id', this.state.id );

      fetch('https://dowesoft.com/lenguajes-prog-avan/index.php',{
         method: 'POST',
         body: data
      })
      .then(response => response.json())
      .then(json =>{ 

          this.setState({ showToast: true })
      })
  
    }




    ionViewWillEnter() {
        this.getPerson()
    }

    render() {

        return (

      <IonPage>

      <IonHeader>

       <IonToolbar color="primary">

        <IonButtons slot="start">
          <IonButton fill="clear" routerLink="/home">
            <IonIcon  icon={arrowBack} />
          </IonButton>
        </IonButtons>
       
        <IonTitle>Borrar la información</IonTitle>
      
      </IonToolbar>
      </IonHeader>


      <IonContent>

        <IonCard>
          <IonCardContent>
              
            <IonList>
              <IonListHeader>
                <IonLabel>¿Desea borrar la información de la persona?</IonLabel>
              </IonListHeader>

              <IonItem>
                <IonLabel>
                    <h2>{this.state.nombre}</h2>
                    <h3>{this.state.telefono}</h3>
                    <p>{this.state.direccion}</p>
                </IonLabel>
              </IonItem>
            </IonList>

            <br/>

            <IonButton color="primary" onClick={this.deletePerson.bind(this)}  >Borrar</IonButton>
            <IonButton color="light" routerLink="/home">Cancelar</IonButton>
          
          </IonCardContent>
        </IonCard>

        <IonToast
            isOpen={this.state.showToast}
            onDidDismiss={() => {
              this.setState({showToast : false});
              (this.props as any).history.push("/home");
            }}
            message="La informacion se borró exitosamente."
            duration={2000}
          />

      </IonContent>

    </IonPage>

   )};
};


export default withIonLifeCycle(DeleteForm);





