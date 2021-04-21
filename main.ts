import { Construct } from 'constructs';
import { App, TerraformStack } from 'cdktf';
import { VpcConstruct } from './vpc';

class MyStack extends TerraformStack {
  constructor(scope: Construct, name: string, env: string) {
    super(scope, name);

    new VpcConstruct(this, 'vpc', {
      name,
      environment: env,
      cidr: '',
      availabilityZones: ["eu-central-1a", "eu-central-1b"],
      privateSubnets: ["10.0.0.0/20", "10.0.32.0/20"],
      publicSubnets: ["10.0.16.0/20", "10.0.48.0/20"]
    });
  }
}

const app = new App();
new MyStack(app, 'cdktf-ecs-fargate-tokens', 'test');
app.synth();
