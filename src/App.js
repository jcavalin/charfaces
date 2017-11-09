import React, {Component} from 'react';
import Alert from 'react-s-alert';
import logo from './logo.png';
import FacesDb from './FacesDb.js';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h2>CharFaces</h2>
                </div>

                <div className="App-faces">
                    <FilterableFaces faces={FacesDb.getRandom()}/>
                </div>

                <Alert stack={{limit: 1}} />
            </div>
        );
    }
}

class FacetRow extends Component {
    static copyToClipboard(text) {
        let textField = document.createElement('textarea');
        textField.innerText = text;
        document.body.appendChild(textField);
        textField.select();
        document.execCommand('copy');
        textField.remove();

        Alert.info(text + ' copied!', {
            position: 'top-right',
            effect: 'bouncyflip',
            timeout: 'none'
        });
    }

    render() {
        return (
            <div key={this.key} className="App-face col-md-6" onClick={() => FacetRow.copyToClipboard(this.props.face.face)}>
                {this.props.face.face}
                <br/>
                {this.props.face.name}
            </div>
        );
    }
}

class FacesList extends Component {
    render() {
        let rows = [];

        this.props.faces.forEach((face) => {
            if (face.name.toLowerCase().indexOf(this.props.filterText.toLocaleLowerCase()) === -1) {
                return;
            }

            rows.push(<FacetRow face={face} key={face.name + Math.random()}/>);
        });

        return (
            <div>
                {rows}
            </div>
        );
    }
}

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    className="form-control App-search-bar"
                    placeholder="Search..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
            </form>
        );
    }
}

class FilterableFaces extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterText: ''
        };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    }

    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    onFilterTextInput={this.handleFilterTextInput}
                />

                <FacesList
                    faces={this.props.faces}
                    filterText={this.state.filterText}
                />
            </div>
        );
    }
}


export default App;
