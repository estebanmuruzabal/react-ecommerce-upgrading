/**
 * Imports
 */
import React from 'react';
import {Link} from 'react-router';
import objectAssign from 'object-assign';
import PropTypes from 'prop-types';
class MainNavigation extends React.Component {

    static contextTypes = {
        getStore: PropTypes.func.isRequired
    };

    //*** Component Lifecycle ***//

    componentDidMount() {

        // Component styles
        require('./MainNavigation.scss');
    }

    //*** Template ***//

    render() {

        return (
            <div className="main-navigation">
                <nav>
                    <ul className="main-navigation-nav-ul">
                        {this.props.collections && this.props.collections.map(function (link, idx) {
                            return (
                                <li key={idx} className="dropdown">
                                    <Link key={idx+4} to={link.to} params={objectAssign(link.params || {})}>
                                        {link.name}
                                    </Link>
                                    { link.submenus ?
                                      <div key={idx+5} className="dropdown-content">
                                        {link.submenus.map(function (link, idx) {
                                            return (
                                              <Link key={idx+6} className="dropdown-link-title" to={link.to} params={objectAssign(link.params || {})}>{link.name}</Link>
                                            );
                                        })}
                                        </div>
                                        :
                                        null
                                    }
                                </li>
                            );
                        })}
                        {this.props.tabs && this.props.tabs.map((link, idx) => {
                            return (
                              <li key={idx} className="dropdown">
                                <Link key={idx+1} to={link.to} params={objectAssign(link.params || {})}>
                                    {link.name}
                                </Link>
                                { link.submenus ?
                                  <div key={idx+2} className="dropdown-content">
                                    {link.submenus.map(function (link, idx) {
                                        return (
                                          <Link key={idx+3} className="dropdown-link-title" to={link.to} params={objectAssign(link.params || {})}>{link.name}</Link>
                                        );
                                    })}
                                    </div>
                                    :
                                    null
                                }
                              </li>
                            );
                         })}
                    </ul>
                </nav>
            </div>
        );
    }
}

/**
 * Exports
 */
export default MainNavigation;
