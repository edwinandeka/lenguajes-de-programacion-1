import {
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonButton,
    IonIcon,
    withIonLifeCycle,
    IonCard,
    IonCardContent,
    IonInput,
    IonToast,

} from '@ionic/react';
import React from 'react';
import { RouteComponentProps } from 'react-router';
import {
    arrowBack,
} from 'ionicons/icons';


interface EditFormProps extends RouteComponentProps<{
  id: string;
}> {}

interface MyStates {
    nombre: string,
    direccion: string,
    telefono: string,
    id: string,
    showToast: boolean,
}


class EditForm extends React.Component <EditFormProps, MyStates> {


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
     * @name savePerson
     * @description se encarga de consultar en el servidor la 
     *              informacion de las personas almacenadas en la base de datos
     * @return {void} 
     */
    updatePerson() {


      const data = new FormData();
      data.append('route', 'persona/edit');

      data.append('id', this.state.id );
      data.append('persona[id]', this.state.id );
      data.append('persona[nombre]', this.state.nombre );
      data.append('persona[telefono]', this.state.telefono );
      data.append('persona[direccion]', this.state.direccion );

      fetch('https://dowesoft.com/lenguajes-prog-avan/index.php',{
         method: 'POST',
         body: data
      })
      .then(response => response.json())
      .then(json =>{ 

            this.setState({  
                showToast : true,  
                nombre: "" ,
                direccion: "",
                telefono: "", 
            })
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
       
        <IonTitle>Editar persona</IonTitle>
      
      </IonToolbar>
      </IonHeader>


      <IonContent>
        {/*-- List of Text Items --*/}

        <IonCard>

      <IonCardContent>
          
         <IonItem>
          <IonLabel position="floating">Nombre</IonLabel>
          <IonInput  value={this.state.nombre} autocapitalize="on" onIonInput={ (e) => this.setState({ nombre: (e.target as HTMLInputElement).value }) }></IonInput>
        </IonItem>

         <IonItem>
          <IonLabel position="floating">Teléfono</IonLabel>
          <IonInput value={this.state.telefono} inputmode="numeric" onIonInput={ (e) => this.setState({ telefono:  (e.target as HTMLInputElement).value }) }></IonInput>
        </IonItem>


         <IonItem>
          <IonLabel position="floating">Dirección</IonLabel>
          <IonInput value={this.state.direccion} onIonInput={ (e) => this.setState({ direccion: (e.target as HTMLInputElement).value }) }></IonInput>
        </IonItem>

        <br/>

        <IonButton color="primary" onClick={this.updatePerson.bind(this)}  >Guardar</IonButton>
        <IonButton color="light" routerLink="/home">Cancelar</IonButton>


      </IonCardContent>
    </IonCard>

        <IonToast
            isOpen={this.state.showToast}
            onDidDismiss={() => {
              this.setState({showToast : false});
              (this.props as any).history.push("/home");
            }}
            message="La informacion se actualizó exitosamente."
            duration={2000}
          />


      </IonContent>

    </IonPage>

   )};
};


export default withIonLifeCycle(EditForm);





