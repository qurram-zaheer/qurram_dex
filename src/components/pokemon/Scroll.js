import React from 'react';

const Scroll = (props) => {
    return(
        <div className = 'mx-0 scroll' style = {{overflowY: 'scroll',height: '900px',overflowX: 'hidden'}}>
            {props.children};
        </div>
    );
}

export default Scroll;