import React from 'react'
import { Container, Content, Spinner } from 'native-base';
import Style from './LoadingStyles';

const Loading = ({ style, onPress, title, disabled = false, children}) => (
	<Container>
	      	<Spinner color={Style.loader.color} />
	      	{children}
	</Container>
)

export default Loading