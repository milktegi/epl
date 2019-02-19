import React from 'react';

import TeamNfo from '../../Elements/teamNfo';

const header = props => {
	
	const teamInfo = (team) => {
		return team ? (
				<TeamNfo team={team}/>
		) : null;
 		
	}
	
	
	return(
		<div>
			{teamInfo(props.teamData)}
		</div>
	)
}


export default header;