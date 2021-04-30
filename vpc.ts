import { Construct } from "constructs";
import { Vpc } from "./modified_gen/vpc";
import { InternetGateway } from "./modified_gen/internet-gateway";
import { NatGateway } from "./modified_gen/nat-gateway";
import { Eip } from "./modified_gen/eip";
import { Subnet } from "./modified_gen/subnet";
import { RouteTable } from "./modified_gen/route-table";
import { Route } from "./modified_gen/route";
import { RouteTableAssociation } from "./modified_gen/route-table-association";
import { CloudwatchLogGroup } from "./modified_gen/cloudwatch-log-group";
import { IamRole } from "./modified_gen/iam-role";
import { IamRolePolicy } from "./modified_gen/iam-role-policy";
import { FlowLog } from "./modified_gen/flow-log";
import { TerraformOutputModified } from "./tf_attributes/terraform-output-modified";
import { TerraformStringListAttribute } from "./tf_attributes/terraform-string-list-attribute";

export interface VpcConstructConfig {
    name: string;
    environment: string;
    cidr: string;
    publicSubnets: string[];
    privateSubnets: string[];
    availabilityZones: string[];
}

export class VpcConstruct extends Construct {
    public constructor(scope: Construct, id: string, config: VpcConstructConfig) {
        super(scope, id);

        const vpc = new Vpc(this, "vpc", {
            cidrBlock: config.cidr,
            enableDnsSupport: true,
            enableDnsHostnames: true,

            tags: {
                Name: `${config.name}-vpc-${config.environment}`,
                Environment: config.environment
            }
        });

        const igw = new InternetGateway(this, "igw", {
            vpcId: vpc.id,

            tags: {
                Name: `${config.name}-igw-${config.environment}`,
                Environment: config.environment
            }
        });

        const publicRouteTable = new RouteTable(this, "public-route-table", {
            vpcId: igw.vpcId,

            tags: {
                Name: `${config.name}-routing-table-public`,
                Environment: config.environment
            }
        });

        new TerraformOutputModified(this, 'test-rt-list', {
            value: publicRouteTable.propagatingVgws
        });

        new TerraformOutputModified(this, 'test-rt-list-elm', {
            value: (publicRouteTable.propagatingVgws as TerraformStringListAttribute).get(0)
        });

        new Route(this, "public-route", {
            routeTableId: publicRouteTable.id,
            destinationCidrBlock: "0.0.0.0/0",
            gatewayId: igw.id
        });

        const publicSubnets = [];
        const privateSubnets = [];

        for (let i = 0; i < config.publicSubnets.length; i++) {
            const index = (i + 1).toString().padStart(3, '0');

            const eip = new Eip(this, `eip-${index}`, {
                vpc: true,
                
                tags: {
                    Name: `${config.name}-eip-${config.environment}-${index}`,
                    Environment: config.environment
                }
            });

            const publicSubnet = new Subnet(this, `public-subnet-${index}`, {
                vpcId: publicRouteTable.vpcId,
                cidrBlock: config.publicSubnets[i],
                availabilityZone: config.availabilityZones[i],

                tags: {
                    Name: `${config.name}-public-subnet-${config.environment}-${index}`,
                    Environment: config.environment
                }
            });
            publicSubnets.push(publicSubnet);

            new TerraformOutputModified(this, `test-subnet-obj-${index}`, {
                value: publicSubnet.timeouts.create
            });

            const privateSubnet = new Subnet(this, `private-subnet-${index}`, {
                vpcId: vpc.id,
                cidrBlock: config.privateSubnets[i],
                availabilityZone: config.availabilityZones[i],

                tags: {
                    Name: `${config.name}-private-subnet-${config.environment}-${index}`,
                    Environment: config.environment
                }
            });
            privateSubnets.push(privateSubnet);

            const ngw = new NatGateway(this, `ngw-${index}`, {
                allocationId: eip.id,
                subnetId: publicSubnet.id,
                dependsOn: [igw],

                tags: {
                    Name: `${config.name}-nat-${config.environment}-${index}`,
                    Environment: config.environment
                }
            });

            const privateRouteTable = new RouteTable(this, `private-route-table-${index}`, {
                vpcId: vpc.id,
    
                tags: {
                    Name: `${config.name}-routing-table-private-${index}`,
                    Environment: config.environment
                }
            });

            new Route(this, `private-route-${index}`, {
                routeTableId: privateRouteTable.id,
                destinationCidrBlock: "0.0.0.0/0",
                natGatewayId: ngw.id
            });

            new RouteTableAssociation(this, `private-rt-association-${index}`, {
                subnetId: privateSubnet.id,
                routeTableId: privateRouteTable.id
            });

            new RouteTableAssociation(this, `public-rt-association-${index}`, {
                subnetId: publicSubnet.id,
                routeTableId: publicRouteTable.id
            });
        }

        const logGroup = new CloudwatchLogGroup(this, 'log-group', {
            name: `${config.name}-cloudwatch-log-group`
        });

        const role = new IamRole(this, 'vpc-flow-logs-role', {
            name: `${config.name}-vpc-flow-logs-role`,

            assumeRolePolicy: `
            {
                "Version": "2012-10-17",
                "Statement": [
                  {
                    "Sid": "",
                    "Effect": "Allow",
                    "Principal": {
                      "Service": "vpc-flow-logs.amazonaws.com"
                    },
                    "Action": "sts:AssumeRole"
                  }
                ]
            }
            `
        });

        new IamRolePolicy(this, 'vpc-flow-logs-policy', {
            name: `${config.name}-vpc-flow-logs-policy`,
            role: role.id,

            policy: `
            {
                "Version": "2012-10-17",
                "Statement": [
                  {
                    "Action": [
                      "logs:CreateLogGroup",
                      "logs:CreateLogStream",
                      "logs:PutLogEvents",
                      "logs:DescribeLogGroups",
                      "logs:DescribeLogStreams"
                    ],
                    "Effect": "Allow",
                    "Resource": "*"
                  }
                ]
            }
            `
        });

        new FlowLog(this, 'flow-log', {
            iamRoleArn: role.arn,
            logDestination: logGroup.arn,
            trafficType: 'ALL',
            vpcId: vpc.id
        });

        new TerraformOutputModified(this, 'id', {
            value: vpc.id
        });

        //TODO figure out how to make this work. Probably by having runtime mapper know about terraform attributes
        // new TerraformOutput(this, 'public_subnets', {
        //     value: publicSubnets
        // });

        // new TerraformOutput(this, 'private_subnets', {
        //     value: privateSubnets
        // });
    }
}