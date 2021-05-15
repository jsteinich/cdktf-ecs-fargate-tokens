// https://www.terraform.io/docs/providers/aws/r/route_table.html
// generated from terraform resource schema

import { Construct } from 'constructs';
import * as cdktf from 'cdktf';
import { TerraformStringAttribute, TerraformString } from '../tf_attributes/terraform-string-attribute';
import { TerraformStringListAttribute, TerraformStringList } from '../tf_attributes/terraform-string-list-attribute';
import { TerraformListAttribute } from '../tf_attributes/terraform-list-attribute';
import { TerraformAttribute } from '../tf_attributes/terraform-attribute';
import { TerraformObjectAttribute } from '../tf_attributes/terraform-object-attribute';
import { listMapper } from 'cdktf';
import { TerraformStringMap, TerraformStringMapAttribute } from '../tf_attributes/terraform-string-map-attribute';
import { ITerraformAddressable } from '../tf_attributes/terraform-addressable';

// Configuration

export interface RouteTableConfig extends cdktf.TerraformMetaArguments {
  readonly propagatingVgws?: TerraformStringList;
  readonly route?: TerraformRouteTableRouteList;
  readonly tags?: TerraformStringMap;
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

export class TerraformRouteTableRouteAttribute extends TerraformObjectAttribute {
  public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: RouteTableRoute, nestedAttribute?: TerraformAttribute) {
    super(parent, terraformAttribute, value, nestedAttribute);
  }

  // I don't think we need to expose this since can get at everything in it
  private get value(): RouteTableRoute | undefined {
    return this.realValue;
  }

  public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformRouteTableRoute) {
    if (!(value instanceof TerraformRouteTableRouteAttribute)) {
        return new TerraformRouteTableRouteAttribute(parent, terraformAttribute, value);
    }
    else if (value.parent === parent) {
        return value;
    }
    else {
        return new TerraformRouteTableRouteAttribute(parent, terraformAttribute, value.value, value);
    }
  }

  protected valueToTerraform() {
    return routeTableRouteToTerraform(this.realValue);
  }

  public get carrierGatewayId(): TerraformStringAttribute {
    return new TerraformStringAttribute(this, 'carrier_gateway_id', this.value?.carrierGatewayId);
  }

  public get cidrBlock(): TerraformStringAttribute {
    return new TerraformStringAttribute(this, 'cidr_block', this.value?.cidrBlock);
  }
  
  //...
}

export type TerraformRouteTableRoute = RouteTableRoute | TerraformRouteTableRouteAttribute;

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

export class TerraformRouteTableRouteListAttribute extends TerraformListAttribute {
  public constructor(parent: ITerraformAddressable, terraformAttribute: string, value?: TerraformRouteTableRoute[], nestedAttribute?: TerraformAttribute) {
    super(parent, terraformAttribute, value, nestedAttribute);
  }

  public get value(): TerraformRouteTableRoute[] | undefined {
    return this.realValue;
  }

  public get(index: number): TerraformRouteTableRouteAttribute {
    return new TerraformRouteTableRouteAttribute(this, index.toString());
}

  public static Create(parent: ITerraformAddressable, terraformAttribute: string, value: TerraformRouteTableRouteList) {
    if (!(value instanceof TerraformRouteTableRouteListAttribute)) {
        return new TerraformRouteTableRouteListAttribute(parent, terraformAttribute, value);
    }
    else if (value.parent === parent) {
        return value;
    }
    else {
        return new TerraformRouteTableRouteListAttribute(parent, terraformAttribute, value.value, value);
    }
  }

  protected valueToTerraform() {
    return listMapper(routeTableRouteToTerraform)(this.realValue);
  }
}

export type TerraformRouteTableRouteList = TerraformRouteTableRoute[] | TerraformRouteTableRouteListAttribute;


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
    this.putRoute(config.route ?? new TerraformRouteTableRouteListAttribute(this, 'route'));
    this.putTags(config.tags ?? new TerraformStringMapAttribute(this, 'tags'));
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
  private _route!: TerraformRouteTableRouteListAttribute
  public get route(): TerraformRouteTableRouteListAttribute {
    return this._route;
  }
  public putRoute(value: TerraformRouteTableRouteList | undefined) {
    if(value === undefined) {
      this._route.reset();
    }
    else {
      this._route = TerraformRouteTableRouteListAttribute.Create(this, 'route', value);
    }
  }

  // tags - computed: false, optional: true, required: false
  private _tags!: TerraformStringMapAttribute
  public get tags(): TerraformStringMapAttribute {
    return this._tags;
  }
  public putTags(value: TerraformStringMap | undefined){
    if(value === undefined) {
      this._tags.reset();
    }
    else {
      this._tags = TerraformStringMapAttribute.Create(this, 'tags', value);
    }
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
      route: this._route.toTerraform(),
      tags: this._tags.toTerraform(),
      vpc_id: this._vpcId.toTerraform(),
    };
  }
}
