import React from 'react';
// Testing Utils
import { render } from '@testing-library/react';
import { Link } from 'carbon-components-react';
import { ArrowRight16 } from '@carbon/icons-react';
import { Card, CardHeader, CardBody } from '../../Components/Card';
import CardLayout from '.';

describe('CardLayout Layout a11y', () => {
  test('the CardLayout component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <CardLayout wrapContentInCols PageHeader={<div />}>
        <Card>
          <CardHeader title="IBM Cloud" />
          <CardBody>
            <div>
              With Red Hat OpenShift on IBM Cloud, OpenShift developers have a
              fast and secure way to containerize and deploy enterprise
              workloads in Kubernetes clusters.
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingTop: '1rem',
              }}
            >
              <Link
                href="https://cloud.ibm.com"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Learn More
                <ArrowRight16 style={{ marginLeft: '1rem', fill: '#0062ff' }} />
              </Link>
            </div>
          </CardBody>
        </Card>
        <Card>
          <CardHeader title="IBM Cloud" />
          <CardBody>
            <div>
              With Red Hat OpenShift on IBM Cloud, OpenShift developers have a
              fast and secure way to containerize and deploy enterprise
              workloads in Kubernetes clusters. OpenShift clusters build on
              Kubernetes container orchestration that offers consistency and
              flexibility in operations. Because IBM manages OpenShift Container
              Platform (OCP), you&apos;ll have more time to focus on your core
              tasks.
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                paddingTop: '1rem',
              }}
            >
              <Link
                href="https://cloud.ibm.com"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                Learn More
                <ArrowRight16 style={{ marginLeft: '1rem', fill: '#0062ff' }} />
              </Link>
            </div>
          </CardBody>
        </Card>
      </CardLayout>,
      { container: document.body.appendChild(main) },
    );

    await expect(container).toBeAccessible('Layouts: CardLayout');
  });
});
