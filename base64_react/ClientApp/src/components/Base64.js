import React from 'react'
import "./Base64.css"
export default class Base64 extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            from: "string",
            error: false,
            string: "",
            base64: ""
        }
        this.convertToB64 = this.convertToB64.bind(this)
        this.convertFromB64 = this.convertFromB64.bind(this)
    }
    async convertToB64() {
        if (this.state.loading || this.state.string==="") {
            return
        }
        this.setState({
            loading: true,
        })
        const response = await fetch("/api/base64/encode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: this.state.string
            })
        })

        const result = await response.json()
        if (result.ok) {
            this.setState({
                loading: false,
                error: false,
                base64: result.text
            })
        } else {
            this.setState({
                loading: false,
                error: true,
                base64: "",
                errorMessage: result.text
            })
        }
    }
    async convertFromB64() {
        if (this.state.loading || this.state.base64 === "") {
            return
        }
        this.setState({
            loading: true,
        })

        const response = await fetch("/api/base64/decode", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text: this.state.base64
            })
        })
        const result = await response.json()
        if (result.ok) {
            this.setState({
                loading: false,
                error: false,
                string: result.text
            })
        } else {
            this.setState({
                loading: false,
                error: true,
                string: "",
                errorMessage: result.text
            })
        }

    }
    convert(e) {
        e.preventDefault()
        switch (this.state.from) {
            case "base64":
                this.convertFromB64(); break
            case "string":
                this.convertToB64(); break
            default:
                return
        }
    }
    handleStringInput(e) {
        this.setState({
            string: e.target.value
        })
    }
    handleBase64Input(e) {
        this.setState({
            base64: e.target.value
        })
    }
    handleCheckBox(e) {
        if (e.target.checked) {
            this.setState({
                from: "base64",
            })
            return
        }
        this.setState({
            from: "string"
        })
    }
    render() {
        const showOrder = this.state.from=="base64"?"base64_first":""
        return (
            <div>
                <form className={`base64-form ${showOrder}`} onSubmit={this.convert.bind(this)}>
                    <h2 className="base64-form__header">Base64 Encode/Decode</h2>
                    <div className="base64-form__group string">
                        <span>Text</span>
                        <textarea onChange={this.handleStringInput.bind(this)} className="base64-form__tob64 textarea" value={this.state.string}></textarea>
                    </div>
                    <div className="base64-form__swap">
                        <label htmlFor="swap-checkbox" className="swap-label">⇕</label>
                    </div>
                    <div className="base64-form__group base64">
                        <span>Base64</span>
                        <textarea onChange={this.handleBase64Input.bind(this)} className="base64-form__fromb64 textarea" value={this.state.base64}></textarea>
                    </div>
                    <input type="checkbox" id="swap-checkbox" onChange={this.handleCheckBox.bind(this)} />
                    <input type="submit" className="base64-form__submit" value="Convert" />
                    <div className={`base64-form__error ${this.state.error?"error-display":""}`}>{this.state.errorMessage}</div> 
                </form>
            </div>
        )
                }
}