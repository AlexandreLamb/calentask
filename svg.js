<Form.Group as={Col} controlId="formBasicInitial"
            style={{
              width: "100%",
              margin: "auto",
              fontSize: "1.25rem",
              margin: "0.1rem",
            }}
            >
              <Form.Label
              style={{
                marginTop: "5%"
              }}
              >
                <strong>Renseignez vos initiales </strong>
                <div>&nbsp;</div>
              </Form.Label>
              <Form.Control
                name="initialValues"
                value={initialValues}
                onChange={this.handleChange}
                type="text"
                placeholder="Ex : ML (Martin Latouche)"
                style={{
                  border: "solid black 2px",
                }}
              />
              <Form.Text className="text-muted"
               style={{
                fontSize: "0.75rem",
              }}>
                Les initiales seront conservées de manière anonyme
              </Form.Text>
            </Form.Group>