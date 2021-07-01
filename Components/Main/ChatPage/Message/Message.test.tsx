import { create } from "react-test-renderer";
import { MessageType } from "../../../../Api/Chat-api";
import { Message } from "./Message";


const fakeObj: MessageType = {
    id: '5',
    message: 'hello world',
    photo: `https://media-exp1.licdn.com/dms/image/C560BAQH9Cnv1weU07g/company-logo
    _200_200/0/1575479070098?e=2159024400&v=beta&t=QM9VSoWVooxDwCONWh22cw0jBBlBPcBOqAxbZIE18jw`, 
    userId: 1,
    userName: 'Davit'
}


describe('tests for message', () => {
    test("userName must be correct", () => {
    
        const component = create(<Message message={fakeObj}/>);

        let root = component.root

        let userNameDiv = root.findByProps({'data-test': 'userNameTest'})
    
        expect(userNameDiv.children[0]).toBe(fakeObj.userName)
      });

      test("message must be correct", () => {
    
        const component = create(<Message message={fakeObj}/>);

        let root = component.root
        
        let span = root.findByType('span')
    
        expect(span.children[0]).toBe(fakeObj.message)
      });

      test("userPhoto must be correct", () => {
    
        const component = create(<Message message={fakeObj}/>);

        let root = component.root
        
        let img = root.findByType('img')
    
        expect(img.props.src).toBe(fakeObj.photo)
      });
})


