import React from 'react';
import { render } from '@testing-library/react';
import { Link } from 'carbon-components-react';
import { ArrowRight16 } from '@carbon/icons-react';
import { Card, CardHeader, CardBody } from '../../Components/Card';
import CardLayout from '.';

describe('CardLayout', () => {
  it('renders the PageHeader and the wrapper class', () => {
    const { container } = render(
      <CardLayout
        wrapContentInCols
        PageHeader={<div className="example-pageheader" />}
      />,
    );

    const CardLayoutClass = container.querySelector('.pal--card-layout');
    const pageHeader = container.querySelector('.example-pageheader');

    expect(CardLayoutClass).toBeInTheDocument();
    expect(pageHeader).toBeInTheDocument();
  });

  it('renders the provided Cards', () => {
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
    );

    expect(container.querySelectorAll('.pal--card')).toHaveLength(2);
    expect(container.querySelectorAll('.cds--col')).toHaveLength(3); // cards plus the PageHeader
  });

  it('renders the provided Cards without wrapping them in cols by default', () => {
    const { container } = render(
      <CardLayout PageHeader={<div />}>
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
    );

    expect(container.querySelectorAll('.pal--card')).toHaveLength(2);
    expect(container.querySelectorAll('.cds--col')).toHaveLength(1); // The PageHeader only
  });

  it('renders the provided Cards with the given col classes', () => {
    const { container } = render(
      <CardLayout
        wrapContentInCols
        PageHeader={<div />}
        colClasses={['cds--col-sm-1', 'cds--col-sm-3']}
      >
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
    );

    expect(container.querySelectorAll('.pal--card')).toHaveLength(2);
    expect(container.querySelectorAll('.cds--col-sm-1')).toHaveLength(1);
    expect(container.querySelectorAll('.cds--col-sm-3')).toHaveLength(1);
  });
});
