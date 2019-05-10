1. implementing the first Tab Navigator
//whenever use the react navigation library find the root component and define the first navigator into it and render it! 

import {TabNavigator} from 'react-navigation'

const MainNavigator = TabNavigator({
  welcome: {screen: WelcomeScreen}, //the keys will using for tab name and screen for screen
  auth: {screen: authScreen}
})

<View>
  <MainNavigator/>
</View>

2. nesting Tab Navigators

const MainScreen = TabNavigator({
  welcome:{ screen: WelcomeScreen},
  auth: {screen: AuthScreen},

  main: TabNavigator({      //main is actually another Tab Screen 
    map: {screen: MapScreen},
    deck: {screen: DeckScreen}
  })

})

3. Stack Navigator  //is using whenever needs to have some kinds of forward and back between Screens

import {StackNavigator} from 'react-navigation'

const MainNavigator = TabNavigator({
  welcome: {screen:WelcomeScreen},
  auth: {screen: authScreen},
  main: TabNavigator({
    map: {screen: MapScreen},
    deck: {screen: DeckScreen},

    review: StackNavigator({        //whenever using stack navigator we get a header for free & we can 
                                    //add some button to navigate beteween screens.
      review:{ screen: ReviewScreen},
      setting:{ screen: settingScreen}
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

  //class propety is availvle in class 
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

  static navigationOptions={ //the navigators looking for this method into components and use it's options to customize the screen

    title: 'Review Jobs', //is a String that used as title of header

    //header function will execute whenever screen is rendered and it return a object that to configure the header 
    
    header : ({navigate})=>{ //navigate is a function using for navigation
      return {
        right: <Button title='setting' onPress={()=> navigate('setting')}/>  //to navigate around the diffrent screen call navigate function and pass the of the key of screen
                                                                            //as a string we want navigate to 
      };
    },
    
    //the style is object using for style header in some fashion

    style:{
      marginTop: Platform.OS === 'android' ? 24 : 0
    },

  }

  render(){
    return;
  }
}
  //react-elements-button styling 
  <Button backgroundColor="rgba(0,0,0,0)" color="rgba(0,125,255,1)" buttonStyle={styles.buttonStyle} reaised  />
  //ScrollView 
  <ScrollView horizental pagingEnabled /> 
  //Diemensions
  const SCREEN_WIDTH = Dimensions.get('window').width;


6. more on navigate
  //whenever render a comopnent using react navigation it pass a set of props navigation to that component
  e.g

onSlideComplete = () =>{
  this.props.navigation.navigate('auth');
  }
