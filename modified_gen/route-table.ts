// https://www.terraform.io/docs/providers/aws/r/route_table.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';
import { TerraformStringAttribute, TerraformString } from '../tf_attributes/terraform-string-attribute';
import { TerraformStringListAttribute, TerraformStringList } from '../tf_attributes/terraform-string-list-attribute';

// Configuration

export interface RouteTableConfig extends cdktf.TerraformMetaArguments {
  readonly propagatingVgws?: TerraformStringList;
  readonly route?: RouteTableRoute[];
  readonly tags?: { [key: string]: string };
  readonly vpcId: TerraformString;
}
export interface RouteTableRoute {
  readonly carrierGatewayId?: string;
  readonly cidrBlock?: string;
  readonly destinationPrefixListId?: string;
  readonly egressOnlyGatewayId?: string;
  readonly gatewayId?: string;
  readonly instanceId?: string;
  readonly ipv6CidrBlock?: string;
  readonly localGatewayId?: string;
  readonly natGatewayId?: string;
  readonly networkInterfaceId?: string;
  readonly transitGatewayId?: string;
  readonly vpcEndpointId?: string;
  readonly vpcPeeringConnectionId?: string;
}

function routeTableRouteToTerraform(struct?: RouteTableRoute): any {
  if (!cdktf.canInspect(struct)) { return struct; }
  return {
    carrier_gateway_id: cdktf.stringToTerraform(struct!.carrierGatewayId),
    cidr_block: struct!.cidrBlock === undefined ? null : cdktf.stringToTerraform(struct!.cidrBlock),
    destination_prefix_list_id: cdktf.stringToTerraform(struct!.destinationPrefixListId),
    egress_only_gateway_id: struct!.egressOnlyGatewayId === undefined ? null : cdktf.stringToTerraform(struct!.egressOnlyGatewayId),
    gateway_id: struct!.gatewayId === undefined ? null : cdktf.stringToTerraform(struct!.gatewayId),
    instance_id: struct!.instanceId === undefined ? null : cdktf.stringToTerraform(struct!.instanceId),
    ipv6_cidr_block: struct!.ipv6CidrBlock === undefined ? null : cdktf.stringToTerraform(struct!.ipv6CidrBlock),
    local_gateway_id: struct!.localGatewayId === undefined ? null : cdktf.stringToTerraform(struct!.localGatewayId),
    nat_gateway_id: struct!.natGatewayId === undefined ? null : cdktf.stringToTerraform(struct!.natGatewayId),
    network_interface_id: struct!.networkInterfaceId === undefined ? null : cdktf.stringToTerraform(struct!.networkInterfaceId),
    transit_gateway_id: struct!.transitGatewayId === undefined ? null : cdktf.stringToTerraform(struct!.transitGatewayId),
    vpc_endpoint_id: struct!.vpcEndpointId === undefined ? null : cdktf.stringToTerraform(struct!.vpcEndpointId),
    vpc_peering_connection_id: struct!.vpcPeeringConnectionId === undefined ? null : cdktf.stringToTerraform(struct!.vpcPeeringConnectionId),
  }
}


// Resource

export class RouteTable extends cdktf.TerraformResource {

  // ===========
  // INITIALIZER
  // ===========

  public constructor(scope: Construct, id: string, config: RouteTableConfig) {
    super(scope, id, {
      terraformResourceType: 'aws_route_table',
      terraformGeneratorMetadata: {
        providerName: 'aws'
      },
      provider: config.provider,
      dependsOn: config.dependsOn,
      count: config.count,
      lifecycle: config.lifecycle
    });
    this.putPropagatingVgws(config.propagatingVgws ?? new TerraformStringListAttribute(this, 'propagating_vgws'));
    this._route = config.route;
    this._tags = config.tags;
    this.putVpcId(config.vpcId);
  }

  // ==========
  // ATTRIBUTES
  // ==========

  // arn - computed: true, optional: false, required: false
  public get arn() {
    return this.getStringAttribute('arn');
  }

  // id - computed: true, optional: true, required: false
  public get id() {
    return this.getStringAttribute('id');
  }

  // owner_id - computed: true, optional: false, required: false
  public get ownerId() {
    return this.getStringAttribute('owner_id');
  }

  // propagating_vgws - computed: true, optional: true, required: false
  private _propagatingVgws!: TerraformStringListAttribute;
  public get propagatingVgws(): TerraformStringListAttribute {
    return this._propagatingVgws;
  }
  public putPropagatingVgws(value: TerraformStringList | undefined) {
    if(value === undefined) {
      this._propagatingVgws.reset();
    }
    else {
      this._propagatingVgws = TerraformStringListAttribute.Create(this, 'propagating_vgws', value);
    }
  }

  // route - computed: true, optional: true, required: false
  private _route?: RouteTableRoute[]
  public get route(): RouteTableRoute[] {
    return this.interpolationForAttribute('route') as any; // Getting the computed value is not yet implemented
  }
  public set route(value: RouteTableRoute[]) {
    this._route = value;
  }
  public resetRoute() {
    this._route = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get routeInput() {
    return this._route
  }

  // tags - computed: false, optional: true, required: false
  private _tags?: { [key: string]: string };
  public get tags() {
    return this.interpolationForAttribute('tags') as any;
  }
  public set tags(value: { [key: string]: string } ) {
    this._tags = value;
  }
  public resetTags() {
    this._tags = undefined;
  }
  // Temporarily expose input value. Use with caution.
  public get tagsInput() {
    return this._tags
  }

  // vpc_id - computed: false, optional: false, required: true
  private _vpcId!: TerraformStringAttribute;
  public get vpcId(): TerraformStringAttribute {
    return this._vpcId;
  }
  public putVpcId(value: TerraformString) {
    this._vpcId = TerraformStringAttribute.Create(this, 'vpc_id', value);
  }

  // =========
  // SYNTHESIS
  // =========

  protected synthesizeAttributes(): { [name: string]: any } {
    return {
      propagating_vgws: this._propagatingVgws.toTerraform(),
      route: cdktf.listMapper(routeTableRouteToTerraform)(this._route),
      tags: cdktf.hashMapper(cdktf.anyToTerraform)(this._tags),
      vpc_id: this._vpcId.toTerraform(),
    };
  }
}
