import React from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const LoanTerms = () => {
  return (
    <Container>
      <h3 className="mt-3">Terms and Conditions for money Loan</h3>
        <h5>Introduction</h5>
      <p>
        These terms and conditions govern your use of our online money lending 
        platform (hereinafter referred to as "the Platform") and the terms of any loan agreement entered 
        into between you and YeilvaSTORE (hereinafter referred to as "the Lender"). By using the Platform and entering
         into a loan agreement, you agree to be bound by these terms and conditions.

      </p>

      <h5>1.Eligibility</h5>
      <p>
        You must meet the following eligibility criteria to use the Platform and apply for a loan:

      You must be at least 18 years old.
      You must be a resident of the Philippines.
      You must have a valid bank account.
      You must provide accurate and truthful information during the application process.
      </p>

      <h5>2. Loan Application Process</h5>
      <p>
       You may apply for a loan through the Platform by completing the online application form.
      The Lender will review your application and may request additional information or documentation.
      Approval of your loan application is at the sole discretion of the Lender.
      </p>

      <h5>3. Loan Terms</h5>
      <p>
       The loan amount, interest rate, repayment period, and other terms will be specified in the loan agreement.
        By accepting the loan agreement, you agree to repay the loan according to the terms outlined therein.
      </p>

      <h5>4. Interest and Fees</h5>
      <p>
        The interest rate and any applicable fees will be clearly stated in the loan agreement.
        Failure to repay the loan on time may result in additional charges and penalties.
      </p>

      <h5>5. Repayment</h5>
      <p>
       You agree to repay the loan in full by the due date specified in the loan agreement.
       Repayment will be made via automatic deductions from your bank account or other agreed-upon payment methods.
      </p>

      <h5>6. Default</h5>
      <p>
       If you fail to repay the loan on time, you will be considered in default.
      The Lender may take legal action to recover the outstanding loan amount, plus any accrued interest, fees, and expenses.
      </p>

      <h5>7. Privacy Policy</h5>
      <p>
       Your privacy is important to us. Please refer to our Privacy Policy for information
        on how we collect, use, and disclose your personal information.
      </p>

      <h5>8.  Amendments</h5>
      <p>
       The Lender reserves the right to amend these terms and conditions at any time. 
       Any changes will be effective immediately upon posting on the Platform.
      </p>

      <h5>9. Governing Law</h5>
      <p>
        These terms and conditions are governed by the laws of Philippines. 
        Any disputes arising out of or relating to these terms and conditions shall be subject to the 
        exclusive jurisdiction of the courts of Philippines.

      </p>

      <h5>10. Contact Information</h5>
      <p>
      If you have any questions or concerns about these terms and conditions, please contact us at {" "} <Link to="/needhelp" > Contact Us</Link>.
      By using the Platform and entering into a loan agreement, you acknowledge that you have read, understood, and agree
      to be bound by these terms and conditions.
      </p>

    </Container>
  );
};

export default LoanTerms;
