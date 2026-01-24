<script lang="ts">
import type { ClassValue } from "@veehance/core/types";
import { cx } from "@veehance/core/utils";

import type { HTMLAttributes } from "svelte/elements";

export interface ContainerProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "class"> {
  class?: ClassValue;
}

let { class: className, children, ...restProps }: ContainerProps = $props();
</script>

<div data-slot="container" class={cx(className)} {...restProps}>
  {@render children?.()}
</div>
