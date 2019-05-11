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
}, {navigationOptions:{
  tabBar: {visivle: false} //hide the tabBar 
},
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
     titleStyle={{color:'red'}}/>
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
    import * as actions from './actions'

    componentDidMount(){
      this.props.facebookLogin()  //actions are available on 
    }

    export default connect(mapStateToProps or null, actions)
    
