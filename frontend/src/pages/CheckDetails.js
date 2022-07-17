import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
const CheckDetails = ({ employeeData }) => {
  return (
    <>
      {employeeData && (
        <div
          className="flex justify-evenly my-2 overflow-y-scroll"
          style={{ height: '80vh' }}
        >
          <div className="my-5">
            <div className="border-2 border-orange-600">
              <div className="flex justify-evenly items-center bg-gradient-to-r from-orange-900 via-orange-600 to-orange-900 ">
                <img className="w-28" src="/companylogo.png" />
                <div className="flex flex-col justify-center items-center  p-2">
                  <img
                    className="w-16 h-16 border-2 border-black rounded"
                    src={employeeData.img_url}
                  />{' '}
                  <p className="font-bold uppercase text-grey">
                    {employeeData.name}
                  </p>
                </div>
                <img className="w-16 border-2 border-black" src="/qr.png" />
              </div>
              <div className="p-2">
                <div className="flex justify-between text-sm my-1">
                  <p>
                    <span className="font-bold uppercase drop-shadow-2xl">
                      Employee Id:
                    </span>{' '}
                    {employeeData.employee_id}
                  </p>{' '}
                  <p>
                    <span className="font-bold uppercase">Job Location:</span>{' '}
                    {employeeData.job_location}
                  </p>
                </div>
                <div className="flex justify-between text-sm my-1">
                  <p>
                    <span className="font-bold uppercase">Department:</span>{' '}
                    {employeeData.dept}
                  </p>
                  <p>
                    <span className="font-bold uppercase">Mobile No:</span>{' '}
                    {employeeData.mobile_no}
                  </p>
                </div>
                <p className="text-sm my-1">
                  <span className="font-bold uppercase">
                    Permanent Address:
                  </span>{' '}
                  {employeeData.per_address}
                </p>
                <div className="flex flex-col items-end my-2 text-sm justify-center">
                  <p>Yours sincerely,</p>
                  <img className="w-10" src="/sign.png" />
                </div>
              </div>
            </div>
          </div>

          <div>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Name
              </InputGroup.Text>
              <Form.Control
                value={employeeData.name}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Employee Id
              </InputGroup.Text>
              <Form.Control
                value={employeeData.employee_id}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Email
              </InputGroup.Text>
              <Form.Control
                value={employeeData.email}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Mobile No
              </InputGroup.Text>
              <Form.Control
                value={employeeData.mobile_no}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Alternate Mobile No
              </InputGroup.Text>
              <Form.Control
                value={employeeData.alt_mobile_no}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Job Location
              </InputGroup.Text>
              <Form.Control
                value={employeeData.job_location}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Temporary Address
              </InputGroup.Text>
              <Form.Control
                value={employeeData.temp_address}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Pan No
              </InputGroup.Text>
              <Form.Control
                value={employeeData.pan_no}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Aadhar No
              </InputGroup.Text>
              <Form.Control
                value={employeeData.aadhar_no}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Account No
              </InputGroup.Text>
              <Form.Control
                value={employeeData.account_no}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Account Holder's Name
              </InputGroup.Text>
              <Form.Control
                value={employeeData.name}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                IFSC Code
              </InputGroup.Text>
              <Form.Control
                value={employeeData.ifsc_code}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Bank Name
              </InputGroup.Text>
              <Form.Control
                value={employeeData.bank_name}
                disabled
                className="bg-white"
              />
            </InputGroup>
            <InputGroup className="my-1">
              <InputGroup.Text id="basic-addon1" className="font-bold">
                Payment Amount
              </InputGroup.Text>
              <InputGroup.Text id="basic-addon2" className="font-bold">
                $
              </InputGroup.Text>
              <Form.Control
                value={employeeData.fixed_salary}
                disabled
                className="bg-white"
              />
            </InputGroup>
          </div>
        </div>
      )}
    </>
  )
}

export default CheckDetails
