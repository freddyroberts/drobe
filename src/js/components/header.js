import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import $ from '../ajax';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      user: []
    }

    this.logoutUser = this.logoutUser.bind(this)
    this.getRidOfPublicFeedUser = this.getRidOfPublicFeedUser.bind(this)

  }

  componentDidMount(){

        let self = this
        if (localStorage.getItem('userSession')) {
          $.ajax({
            url: `https://api.parse.com/1/users/me`,
            type: 'GET',
            headers: {"X-Parse-Session-Token": JSON.parse(localStorage.getItem('userSession')).sessionToken},
            success: (response) => {
              self.setState({user: response.username})
              self.props.loginUser(response)
              console.log(response)
            }
          });
        }
  }


  getRidOfPublicFeedUser(){
    this.props.getRidOfPublicFeedUser()
  }
  logoutUser(e) {
    let self = this;
    e.preventDefault();
    $.ajax({
      headers: {
        "X-Parse-Session-Token": JSON.parse(localStorage.getItem('userSession')).sessionToken
      },
      url: `https://api.parse.com/1/logout`,
      type: 'POST',
      success: function() {
        self.props.logoutUser(null, '/dashboard');
      }
    })
  }
  render() {
    let links;
    let user = this.props.userSession.username;
    if (this.props.loggedIn === true) {
      links = (
        <div className="linkContainer">
          <div className="userbox">
          <span href="#" className="avatar"><img src="http://www.fillmurray.com/50/50" /></span>
          <span className="userlink">Welcome, {user}</span>
          </div>
          <section className="headerNav">
            <Link onClick={this.getRidOfPublicFeedUser} className="headerlink " to="/dashboard">
              Dashboard
            </Link>
            <Link onClick={this.getRidOfPublicFeedUser} className="headerlink" to="/closet">
              Closet
            </Link>
            <Link onClick={this.getRidOfPublicFeedUser} className="headerlink" to="/outfits">
              Outfits
            </Link>
            <Link onClick={this.getRidOfPublicFeedUser} className="headerlink" to="/outfitdesigner">
              Outfit Designer
            </Link>
            <Link onClick={this.getRidOfPublicFeedUser} className="headerlink" to="/publicfeed">
              Public Feed
            </Link>
            <Link className="headerlink" to="/" onClick={this.logoutUser}>
              Logout
            </Link>
          </section>
        </div>
      )
    }
    return (
      <header className="mainheader">
        <h1 className="hangerlogo">
          <a href="#" className="drobe">DROBE</a>
        </h1>
        {links}
      </header>
    )
  }
}

export default Header;
