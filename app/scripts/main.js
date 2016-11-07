const App = React.createClass({
  getInitialState: function() {
    return {
      base: 'USD',
      symbol: null,
      currencies: null,
      rate: null,
      value: null,
    }
  },

  componentDidMount: function() {
    let that = this;
    fetch('http://api.fixer.io/latest?base=USD',{
      method: 'get'
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
     that.setState({currencies : Object.keys(json.rates)})
    }).catch(function(err) {
      alert('There was an erro fetching the currencies')
    })
  },

  setSymbol(e) {
    let symbol = e.target.value;
    this.setState({symbol: symbol})
  },

  getExchange(e) {
    let that = this;
    fetch('http://api.fixer.io/latest?base=USD&symbols=' + this.state.symbol,{
      method: 'get'
    }).then(function(response) {
      return response.json()
    }).then(function(json) {
      let s = Object.keys(json.rates)[0];
      let rate = json.rates[s];
      that.setState({rate: rate})
    }).catch(function(err) {
      alert('There was an erro fetching the currencies')
    })

  },

  setValue(e) {
    this.setState({value: e.target.value});
  },

  render: function() {
    return (
      <div className='container'>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <p>CONVER ANY CURRENCY TO USD</p>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <input type="number" placeholder="Choose a value" onChange={this.setValue} />
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            {this.state.currencies ?
              <select style={{marginTop: '20px'}} onChange={this.setSymbol}>
                <option value=''>Please choose a value</option>
                {this.state.currencies.map(currency =>
                  {
                 return <option key={currency} value={currency}>{currency}</option>
                })}
              </select>
             :
              <p>loading...</p>}
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <button style={{marginTop: '20px', marginBottom: '20px'}} type="button" className="btn btn-success" onClick={this.getExchange}>CONVERT</button>
          </div>
          <div className="col-md-4"></div>
        </div>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
           {this.state.rate ?
            <div>
              <p>The {this.state.symbol} is exchanging at {this.state.rate} to the USD</p>
              <p>{this.state.value} {this.state.symbol} = {Math.round(this.state.value / this.state.rate)} USD</p>
            </div>
            :
            <p>No conversion made yet</p>}
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    )
  }
})

ReactDOM.render(<App />, document.getElementById('content'))

