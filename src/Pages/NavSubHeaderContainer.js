import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { Link } from "react-router-dom";
import './NavHeaderContainer.css';

// mock up data -- need to removed in the future
import { listSubMenu } from '../helpers/mock';
import * as routes from '../routes';

const MenuItem = ({text, url, selected}) => {
  if (url === routes.CITY) {
    url = routes.CITY + '/' + text.replace(' ', '');
  }

  return (
    <div className={`menu-item ${selected ? "active" : ""}`}>
      
      {text}
    
    </div>
  );
};

export const Menu = (list, selected) => list.map(item => {
  const {name, url} = item;
  const isSelected = name === selected;

  return (
    <MenuItem 
      text={name}
      key={name}
      url={url}
      selected={isSelected}
    />
  );
});

const Arrow = ({text, className}) => {
  return (
    <FontAwesomeIcon
      icon={text}
    />
  );
};

const ArrowLeft = Arrow({text:"chevron-left", className:'arrow-prev'});
const ArrowRight = Arrow({text:"chevron-right", className:'arrow-next'});

class NavSubHeaderContainer extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.location.pathname);
    let sel = null;
    if (this.props.match.url !== '/') {
      sel = (this.props.match.url === routes.CITY) ? 
      listSubMenu.find((item) => {return routes.CITY + '/' + item.name.replace(' ', '') === this.props.location.pathname}).name :
      listSubMenu.find((item) => {return item.url === this.props.match.url}).name;
    }

    this.state = {
      selected: sel,
    };
  }

  onSelect = key => {
    this.setState({selected: key});
    
    let url = listSubMenu.find((item) => {return item.name === key}).url;
    if (url === routes.CITY) {
      url = routes.CITY + '/' + key.replace(' ', '');
    }

    // if (key === "Search" || key === "Queue" || key === "Favorite" || key ==="Most Popular") {
    //   url = "/"+key.toLowerCase();
    //   if (key === "Favorite")
    //   url = "/favorites";
    //   if (key === "Most Popular")
    //   url = "/most-popular";
    //   if (key === "Recently Added")
    //     url = "/recently-added";
    // } else {
    //   url = "/city/" + key.replace(' ', '');
    // }

    console.log("onSelected: " + key + "URL: " + url);
    this.props.history.push(url);
  }

  render() {
    console.log(this.props.match.path);

    const {selected} = this.state;
    const menu = Menu(listSubMenu, selected);
    
    return (
      <div className="navSubHeaderContainer">
        <ScrollMenu 
          data={menu}
          selected={selected}
          onSelect={this.onSelect}
          clickWhenDrag={true}
        />
        <hr className="hr_margin"/>
      </div>
    );
  }
}

export default withRouter(NavSubHeaderContainer);