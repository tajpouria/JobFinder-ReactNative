## Section One (React-native-Navigation)


1. implementing the first Tab Navigator
//whenever use the react navigation library find the root component and 
//define the first navigator into it and render it! 

import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

const TabNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen
});

export default createAppContainer(TabNavigator);

2. nesting Tab Navigators


const TabNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: createBottomTabNavigator({
    deck: DeckScreen,
    map: MapScreen
  })
});

3. Stack Navigator  //is using whenever needs to have some kinds of forward and back between Screens

import {createStackNavigator} from 'react-navigation';

const TabNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: createBottomTabNavigator({
    deck: DeckScreen,
    map: MapScreen,

    review: createStackNavigator({
      review: ReviewScreen,
      setting: SettingScreen
    })

  })
}, { defaultNavigationOptions: {tabBarVisible: false}
lazy: true})  ********// by default react navigation render all screen provided in TabNavigator even user not visit it by setting lazy option 
                          // it will render the Screens when user try to see the screen

4. class(static) vs instace property
  
  //instance property is available in instace of a class
  e.g
class Screen{
  this.color = 'red'
}

const screen = Screen();
screen.color //'red'

  //class propety is available in class 
  e.g
class Screen{
  static color = 'red'
}

const screen = new Screen()
screen.color //undefined
Screen.color //red

5. static navigationOptions Object

//whenever navigator (Tab and Stack) about to render screens;they look for that screen component naviagationOptions property

e.g

import {Button} from 'react-native-elements'

class ReviewScreen extends Component{

  static navigationOptions=({navigation})=>{ 
    return{
    headerTitle: 'Review Jobs',
    headerRight:(
      <Button title="Setting"
        onPress={()=>{navigation.navigate('setting')}}
      />
    ),
    style:{
      marginTop: Platform.OS === 'android' ? 24 : 0
    },

  }}

  render(){
    return;
  }
}
 //ScrollView 
  <ScrollView horizental pagingEnabled /> 
  //Diemensions
  const SCREEN_WIDTH = Dimensions.get('window').width;
  // react native elements Button
     <Button 
     title="Onwards!" 
     containerStyle={{ marginTop: 10 }}  
     titleStyle={{color:'red'}}
     large
     icon={{name:'search'}}
     />
  //react native elements Card
   <Card title='atitle' />
  //passing multi style
  style={[styles.slideContainer, { backgroundColor: slide.color }]}

6. more on navigate
  //whenever render a component using react navigation it pass a set of props navigation to that component
  e.g

onSlideComplete = () =>{
  this.props.navigation.navigate('auth');
  }

## Section Two (FaceBook Authentication)

// first step is register application in developers faceBook 
//documentation is available on expo facebook

1. redux setup

> npm i redux react-redux redux-thunk


//1 creating store

import {createStore,compose,applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-think'

const store = createStore(reducers,{},compose(applyMiddleware(thunk)))

<Provider store={store}><App/></Provider>

//2 setup reducers

import {combineReducers} from 'redux';

import auth from './auth_reducer';

export default combineReducers({
  auth
})

"./auth_reducer"
// all reducers boilerPlate

import {FACEBOOK_LOGIN_SUCCESS} from '../actions/types'

export default function(state={}, action){
  switch(action.type){
    case FACEBOOK_LOGIN_SUCCESS:
      return {token: action.payload}
    default:
      return state;
  }
}


//3 make action types and action creator

    1. AyncStorage 
    // AsyncStorage is a Object that is part of react-native 
    //that allows us to store small snippets of data in user phone.
     
    import { AsyncStorage } from 'react-native'

    // it have three utility async function:
      1. AsyncStorage.getItem('key')
      2. AsyncStorage.setItem('key', value)
      3. AsyncStorage.removeItem('key')

   

    export const facebookLogin = () => async dispatch =>{ //dispatch is provided by redux-thunk and using for dispatching type and payload
      let token = await AsyncStorage.getItem('fb_token')
               ***** // whenever we return a function from action creator and thunk as wire upe that function will be call with dispatch 
      if(token) {
        dispatch({type: FACEBOOK_LOGIN_SUCCESS, payload: token})
      }else{
        doFaceBookLogin(dispatch)
      }
    } 

    2. Expo FaceBook Process

    import { Facebook } from 'expo';

    const doFaceBookLogin = async dispatch => {
      const {type, token} = await Facebook.logInWithReadPermissionsAsync('appId', {permissions: ['public_profile']}) 

      if(type === 'cancel') return dispatch({type:FACEBOOK_LOGIN_FAIL })

      await AsyncStorage.setItem('fb_token',token)
      dispatch({type:FACEBOOK_LOGIN_SUCCESS, payload: token})
    }

      //import all file from index in a folder
      export * from './auth_actions'

      import * as actions from './actions'


  //4 connect component to states and actions
    import { connect } from 'react-redux'
    ***// it seems like react-redux v 7.0.0 have a bug by react native
      //i usede react-redux@6.0.1

      //clearing catch after uninstall a node package
      > expo r -c


    import * as actions from './actions'

    componentDidMount(){
      this.props.facebookLogin()  //actions are available on props
    }


    function mapStateToProps(state or {auth}){
      return {token: a  uth.token}
    }

    export default connect(mapStateToProps or null, actions)
    

  // a little bit React lifeSycle

    componentDidMount(){} //will calling when component render(born)

     //wil calling when component receive new Props and calling with new props
    componentWillReceiveProps(nextProps){  
      this.onAuthComplete(nextProps) //calling a function by new props 
    }

3. async lifeCycles //it's also possible to using lifeCycle methods asynchronous

  e.g.

  async ComponentWillMount(){
    const token = await AsyncStorage.getItems('fb_token')
  }

4. react navigation expo setup 

const TabNavigator = createBottomTabNavigator({
  welcome: WelcomeScreen,
  auth: AuthScreen,
  main: createBottomTabNavigator({
    deck: DeckScreen,
    map: MapScreen,
    review: createStackNavigator({
      review: ReviewScreen,
      setting: SettingScreen
    })
  })
});

let Navigation = createAppContainer(TabNavigator);

  <Provider store={store}>
    <Navigation />
  </Provider>


export default App;

## Section Three (MapView in reactNative)

1. showing a map

import {MapView} from 'expo'

<View style={{flex:1}}>
  <MapView style={{flex:1}}/>
</View>

2. interact with MapView

  1.region:

    state = {
      //region is a Object => centering map and zooming  
      region:{
        longitude: -122,
        latitude: 37,
        longitudeDelta: 0.04,
        latitudeDelta: 0.09
      }
    }

    <MapView region={this.state.region} />

  2. OnRegionChangeComplete:

  // this property will call whenever user move around the map and we can use it to update region
    OnRegionChangeComplete=(region)=>{
      this.ListeningStateChangedEvent({region})
    }
  
    <mapView OnRegionChangeComplete={this.OnRegionChangeComplete}/>

3.  using qs module //is short fro queryString it using for turn js object to string
 
> npm i qs

const JOBS_QUERY_PARMAS = {
  publisher: '4321353541',
  form : 'json',
  v: '2',
  latlong: 1,
  radius: 10,
  q: 'javascript'
}

conts query = qs.stringify({...JOBS_QUERY_PARMAS, l: zip})
return `site.com/${query}`

4. replace js built in function // it will look for given element into string and replace it by another given screen

jobs.snippets.replace(/<b>/g,'').replace(/<\/b/g, '')