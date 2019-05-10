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
})

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

6. more on navigate
  //whenever render a comopnent using react navigation it pass a set of props navigation to that component
  e.g

onSlideComplete = () =>{
  this.props.navigation.navigate('auth');
  }
