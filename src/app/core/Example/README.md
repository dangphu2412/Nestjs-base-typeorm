# Apply auth example

<code>
// Intercept exception sql
@UseInterceptors(SqlInterceptor)
@GrantAccess({
    action: ECrudAction.CREATE // Grant permission for this resource to auth
})
@Override("createOneBase") // Override create one base of typeorm crud
async createOneOverride(
@ParsedRequest() req: CrudRequest,
@ParsedBody() dto: Customer
): Promise<T> {
    // Custom logic happen here
    return this.base.createOneBase(req, dto);
};
</code>