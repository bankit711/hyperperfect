"use client"

import { useEffect } from 'react'
import Script from 'next/script'

export default function BrevoForm() {
  useEffect(() => {
    // Set up global variables that Brevo form expects
    if (typeof window !== 'undefined') {
      (window as any).REQUIRED_CODE_ERROR_MESSAGE = 'Please choose a country code';
      (window as any).LOCALE = 'en';
      (window as any).EMAIL_INVALID_MESSAGE = (window as any).SMS_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
      (window as any).REQUIRED_ERROR_MESSAGE = "This field cannot be left blank. ";
      (window as any).GENERIC_INVALID_MESSAGE = "The information provided is invalid. Please review the field format and try again.";
      (window as any).REQUIRED_MULTISELECT_MESSAGE = 'Please select at least 1 option';
      (window as any).translation = {
        common: {
          selectedList: '{quantity} list selected',
          selectedLists: '{quantity} lists selected',
          selectedOption: '{quantity} selected',
          selectedOptions: '{quantity} selected',
        }
      };
      (window as any).AUTOHIDE = Boolean(0);
    }
  }, [])

  return (
    <>
      <link rel="stylesheet" href="https://sibforms.com/forms/end-form/build/sib-styles.css" />
      <Script 
        src="https://sibforms.com/forms/end-form/build/main.js" 
        strategy="afterInteractive"
      />
      
      <style jsx>{`
        @font-face {
          font-display: block;
          font-family: Roboto;
          src: url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/7529907e9eaf8ebb5220c5f9850e3811.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/normal/normal/25c678feafdc175a70922a116c9be3e7.woff) format("woff")
        }

        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 600;
          src: url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/6e9caeeafb1f3491be3e32744bc30440.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/medium/normal/71501f0d8d5aa95960f6475d5487d4c2.woff) format("woff")
        }

        @font-face {
          font-display: fallback;
          font-family: Roboto;
          font-weight: 700;
          src: url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/3ef7cf158f310cf752d5ad08cd0e7e60.woff2) format("woff2"), url(https://assets.brevo.com/font/Roboto/Latin/bold/normal/ece3a1d82f18b60bcce0211725c476aa.woff) format("woff")
        }

        #sib-container input:-ms-input-placeholder {
          text-align: left;
          font-family: Helvetica, sans-serif;
          color: #c0ccda;
        }

        #sib-container input::placeholder {
          text-align: left;
          font-family: Helvetica, sans-serif;
          color: #c0ccda;
        }

        #sib-container textarea::placeholder {
          text-align: left;
          font-family: Helvetica, sans-serif;
          color: #c0ccda;
        }

        #sib-container a {
          text-decoration: underline;
          color: #2BB2FC;
        }

        /* Input field styling */
        .input {
          border-radius: 8px !important;
          border: 1px solid #d1d5db !important;
          padding: 12px !important;
          transition: border-color 0.2s !important;
        }

        .input:focus {
          border-color: #1a7bff !important;
          box-shadow: 0 0 0 2px rgba(26, 123, 255, 0.1) !important;
          outline: none !important;
        }

        /* Black checkbox styling */
        .checkbox_tick_positive {
          border-color: #000000 !important;
        }

        input[type="checkbox"]:checked + .checkbox_tick_positive {
          background-color: #000000 !important;
          border-color: #000000 !important;
        }

        input[type="checkbox"]:checked + .checkbox_tick_positive::after {
          border-color: #ffffff !important;
        }

        /* Submit button styling */
        .sib-form-block__button {
          background-color: #1a7bff !important;
          border-radius: 8px !important;
          padding: 16px 32px !important;
          font-size: 18px !important;
          font-weight: 600 !important;
          width: 100% !important;
          border: none !important;
          color: #ffffff !important;
          transition: background-color 0.2s !important;
        }

        .sib-form-block__button:hover {
          background-color: #1563d9 !important;
        }
      `}</style>

      <div className="sib-form" style={{textAlign: 'center', backgroundColor: 'transparent'}}>
        <div id="sib-form-container" className="sib-form-container">
          <div id="error-message" className="sib-form-message-panel" style={{fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949', maxWidth: '540px'}}>
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
                <path d="M256 40c118.621 0 216 96.075 216 216 0 119.291-96.61 216-216 216-119.244 0-216-96.562-216-216 0-119.203 96.602-216 216-216m0-32C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm-11.49 120h22.979c6.823 0 12.274 5.682 11.99 12.5l-7 168c-.268 6.428-5.556 11.5-11.99 11.5h-8.979c-6.433 0-11.722-5.073-11.99-11.5l-7-168c-.283-6.818 5.167-12.5 11.99-12.5zM256 340c-15.464 0-28 12.536-28 28s12.536 28 28 28 28-12.536 28-28-12.536-28-28-28z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                Your submission could not be saved. Please try again.
              </span>
            </div>
          </div>
          <div></div>
          <div id="success-message" className="sib-form-message-panel" style={{fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#085229', backgroundColor: '#e7faf0', borderRadius: '3px', borderColor: '#13ce66', maxWidth: '540px'}}>
            <div className="sib-form-message-panel__text sib-form-message-panel__text--center">
              <svg viewBox="0 0 512 512" className="sib-icon sib-notification__icon">
                <path d="M256 8C119.033 8 8 119.033 8 256s111.033 248 248 248 248-111.033 248-248S392.967 8 256 8zm0 464c-118.664 0-216-96.055-216-216 0-118.663 96.055-216 216-216 118.664 0 216 96.055 216 216 0 118.663-96.055 216-216 216zm141.63-274.961L217.15 376.071c-4.705 4.667-12.303 4.637-16.97-.068l-85.878-86.572c-4.667-4.705-4.637-12.303.068-16.97l8.52-8.451c4.705-4.667 12.303-4.637 16.97.068l68.976 69.533 163.441-162.13c4.705-4.667 12.303-4.637 16.97.068l8.451 8.52c4.668 4.705 4.637 12.303-.068 16.97z" />
              </svg>
              <span className="sib-form-message-panel__inner-text">
                Thank you!
              </span>
            </div>
          </div>
          <div></div>
          <div id="sib-container" className="sib-container--large sib-container--vertical" style={{textAlign: 'center', backgroundColor: 'transparent', maxWidth: '540px', borderRadius: '3px', borderWidth: '0px', borderColor: 'transparent', borderStyle: 'none', direction: 'ltr'}}>
            <form id="sib-form" method="POST" action="https://8f7f9936.sibforms.com/serve/MUIFAJUvy7WhtLBEr2d20otfwu-OK3La12ZYigq98-1Y97BHBX3nwFfBZ2qAaexqlhxhBxzycK3VuuO7Ihxnf5WHhQsxVjfzDNQTeDtycEAVLJnz3RTvHg6FcJtwmKCiBQ66fZuWWGb6wwgP4Ntl7pjhcohEdNxA9Fp6N8q_Ael283EfaGwa0Gj6hnzoVTdjMrGyNWP-Pz2011eV" data-type="subscription">
              <div style={{padding: '16px 0'}}>
                <div className="sib-form-block" style={{fontSize: '25px', textAlign: 'left', fontWeight: '700', fontFamily: 'Helvetica, sans-serif', color: '#050505', backgroundColor: 'transparent'}}>
                  <div className="sib-text-form-block">
                    <p>📬 Receive Your Cohort Analysis File</p>
                  </div>
                </div>
              </div>
              {/* Name Fields Row */}
              <div style={{padding: '16px 0'}}>
                <div style={{display: 'flex', gap: '16px'}}>
                  <div className="sib-input sib-form-block" style={{flex: 1}}>
                    <div className="form__entry entry_block">
                      <div className="form__label-row ">
                        <label className="entry__label" style={{fontWeight: 700, textAlign: 'left', fontSize: '16px', fontFamily: 'Helvetica, sans-serif', color: '#050505'}} htmlFor="FIRSTNAME" data-required="*">First Name</label>

                        <div className="entry__field">
                          <input className="input " maxLength="200" type="text" id="FIRSTNAME" name="FIRSTNAME" autoComplete="off" data-required="true" required />
                        </div>
                      </div>

                      <label className="entry__error entry__error--primary" style={{fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949'}}>
                      </label>
                    </div>
                  </div>
                  
                  <div className="sib-input sib-form-block" style={{flex: 1}}>
                    <div className="form__entry entry_block">
                      <div className="form__label-row ">
                        <label className="entry__label" style={{fontWeight: 700, textAlign: 'left', fontSize: '16px', fontFamily: 'Helvetica, sans-serif', color: '#050505'}} htmlFor="LASTNAME" data-required="*">Last Name</label>

                        <div className="entry__field">
                          <input className="input " maxLength="200" type="text" id="LASTNAME" name="LASTNAME" autoComplete="off" data-required="true" required />
                        </div>
                      </div>

                      <label className="entry__error entry__error--primary" style={{fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949'}}>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{padding: '16px 0'}}>
                <div className="sib-input sib-form-block">
                  <div className="form__entry entry_block">
                    <div className="form__label-row ">
                      <label className="entry__label" style={{fontWeight: 700, textAlign: 'left', fontSize: '16px', fontFamily: 'Helvetica, sans-serif', color: '#050505'}} htmlFor="EMAIL" data-required="*">Email</label>

                      <div className="entry__field">
                        <input className="input " type="text" id="EMAIL" name="EMAIL" autoComplete="off" data-required="true" required />
                      </div>
                    </div>

                    <label className="entry__error entry__error--primary" style={{fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949'}}>
                    </label>
                    <label className="entry__specification" style={{fontSize: '12px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#8390A4'}}>
                      Enter the same email you use for Excel if you want to try HyperPerfect
                    </label>
                  </div>
                </div>
              </div>
              <div style={{padding: '16px 0'}}>
                <div className="sib-checkbox-group sib-form-block" data-required="true">
                  <div className="form__entry entry_mcq">
                    <div className="form__label-row ">
                      <label className="entry__label" style={{fontWeight: 700, textAlign: 'left', fontSize: '16px', fontFamily: 'Helvetica, sans-serif', color: '#050505'}} data-required="*">What do you want?</label>
                      <div style={{}}>
                        <div className="entry__choice">
                          <label className="checkbox__label">
                            <input type="checkbox" className="input_replaced" name="lists_40[]" data-value="I want to try HyperPerfect for free" value="11" data-required="true" />
                            <span className="checkbox checkbox_tick_positive"
                          style={{marginLeft: ""}}
                          ></span><span style={{fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#3C4858', backgroundColor: 'transparent'}}>I want to try HyperPerfect for free</span> </label>
                        </div>
                        <div className="entry__choice">
                          <label className="checkbox__label">
                            <input type="checkbox" className="input_replaced" name="lists_40[]" data-value="I want the Cohort Analysis Excel file" value="12" data-required="true" />
                            <span className="checkbox checkbox_tick_positive"
                          style={{marginLeft: ""}}
                          ></span><span style={{fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#3C4858', backgroundColor: 'transparent'}}>I want the Cohort Analysis Excel file</span> </label>
                        </div>
                      </div>
                    </div>
                    <label className="entry__error entry__error--primary" style={{fontSize: '16px', textAlign: 'left', fontFamily: 'Helvetica, sans-serif', color: '#661d1d', backgroundColor: '#ffeded', borderRadius: '3px', borderColor: '#ff4949'}}>
                    </label>
                  </div>
                </div>
              </div>
              <div style={{padding: '16px 0'}}>
                <div className="sib-form-block" style={{textAlign: 'center'}}>
                  <button className="sib-form-block__button sib-form-block__button-with-loader" style={{fontSize: '22px', textAlign: 'center', fontWeight: 700, fontFamily: 'Helvetica, sans-serif', color: '#FFFFFF', backgroundColor: '#1a7bff', borderRadius: '3px', borderWidth: '0px'}} form="sib-form" type="submit">
                    <svg className="icon clickable__icon progress-indicator__icon sib-hide-loader-icon" viewBox="0 0 512 512" style={{}}>
                      <path d="M460.116 373.846l-20.823-12.022c-5.541-3.199-7.54-10.159-4.663-15.874 30.137-59.886 28.343-131.652-5.386-189.946-33.641-58.394-94.896-95.833-161.827-99.676C261.028 55.961 256 50.751 256 44.352V20.309c0-6.904 5.808-12.337 12.703-11.982 83.556 4.306 160.163 50.864 202.11 123.677 42.063 72.696 44.079 162.316 6.031 236.832-3.14 6.148-10.75 8.461-16.728 5.01z" />
                    </svg>
                    SUBMIT
                  </button>
                </div>
              </div>

              <input type="text" name="email_address_check" value="" className="input--hidden" />
              <input type="hidden" name="locale" value="en" />
            </form>
          </div>
        </div>
      </div>
    </>
  )
}